import { IMaskInput } from 'react-imask';
import {
   containerClass,
   dropdownContainerClass,
   dropdownInputClass,
   dropdownTriggerClass,
   dropdownTriggerIconClass,
   errorClass,
} from '../classNames';
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
               disabled={disabled}
               inputRef={ref}
               lazy={true}
               mask='#HHHHHHHH'
               name={name}
               onAccept={onChange}
               onFocus={onFocus}
               overwrite={true}
               placeholder={placeholder}
               value={value}
               definitions={{
                  H: /[0-9a-fA-F]/,
               }}
               onBlur={e => {
                  const newValue =
                     value?.length === 9
                        ? value
                        : value?.length >= 7
                          ? value.slice(0, 7)
                          : value?.length >= 4
                            ? value.slice(0, 4)
                            : '';
                  onChange(newValue);
                  if (typeof onBlur === 'function') {
                     onBlur(e);
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
         {!!error && (
            <h5 className={errorClass(classNameOptions)} role='alert'>
               {error}
            </h5>
         )}
      </div>
   );
};
export default Control;
