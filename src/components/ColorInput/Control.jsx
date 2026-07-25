import { IMaskInput } from 'react-imask';
import {
   containerClass,
   dropdownContainerClass,
   dropdownInputClass,
   dropdownTriggerClass,
   dropdownTriggerIconClass,
} from '../classNames';
import ErrorMessage from '../components/ErrorMessage';
const Control = ({
   ariaLabel,
   containerClassName = '',
   disabled = false,
   dropdownContainerClassName = '',
   dropdownInputClassName = '',
   dropdownTriggerClassName = '',
   dropdownTriggerIconClassName = '',
   error = '',
   errorClassName = '',
   getReferenceProps,
   id,
   name,
   onBlur,
   onChange,
   onFocus,
   placeholder = '',
   ref,
   refs,
   size = 'md',
   value,
}) => {
   const classNameOptions = {
      containerClassName,
      disabled: !!disabled,
      dropdownContainerClassName,
      dropdownInputClassName,
      dropdownTriggerClassName,
      dropdownTriggerIconClassName,
      error: !!error,
      errorClassName,
      size,
   };
   return (
      <div className={containerClass(classNameOptions)}>
         <div
            className={dropdownContainerClass(classNameOptions)}
            ref={node => refs?.setReference(node)}
         >
            <IMaskInput
               aria-label={ariaLabel}
               className={dropdownInputClass(classNameOptions)}
               definitions={{ H: /[0-9a-fA-F]/ }}
               disabled={disabled}
               id={id}
               inputRef={ref}
               lazy={true}
               mask='#HHHHHHHH'
               name={name}
               onFocus={onFocus}
               overwrite={true}
               placeholder={placeholder}
               value={value}
               onAccept={(value, event) => {
                  onChange(value, { event });
               }}
               onBlur={event => {
                  const value = event?.target?.value;
                  const newValue =
                     value?.length === 9
                        ? value
                        : value?.length >= 7
                          ? value.slice(0, 7)
                          : value?.length >= 4
                            ? value.slice(0, 4)
                            : '';
                  onChange(newValue, { event });
                  if (typeof onBlur === 'function') {
                     onBlur(event);
                  }
               }}
            />
            <div className={dropdownTriggerClass(classNameOptions)}>
               <div
                  {...getReferenceProps()}
                  className={dropdownTriggerIconClass(classNameOptions)}
               >
                  <div
                     className='border-2 w-5 h-5 rounded-lg border-(--color-input-trigger-border-color)'
                     style={{ backgroundColor: value }}
                  />
               </div>
            </div>
         </div>
         <ErrorMessage size={size} error={error} />
      </div>
   );
};
export default Control;
