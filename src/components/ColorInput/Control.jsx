import { IMaskInput } from 'react-imask';
import {
   dropdownContainerClass,
   dropdownInputClass,
   dropdownTriggerClass,
   dropdownTriggerIconClass,
} from '../classNames';
const Control = ({
   error = '',
   getReferenceProps,
   isDisabled = false,
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
   const classNameOptions = { disabled: isDisabled, error, size };
   return (
      <div
         className={dropdownContainerClass(classNameOptions)}
         data-disabled={isDisabled}
         data-error={!!error}
         onFocus={onFocus}
         ref={refs?.setReference}
      >
         <IMaskInput
            className={dropdownInputClass(classNameOptions)}
            data-error={!!error}
            data-size={size}
            disabled={isDisabled}
            inputRef={ref}
            lazy={true}
            mask='#HHHHHHHH'
            name={name}
            onAccept={onChange}
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
            <button
               {...getReferenceProps()}
               disabled={isDisabled}
               className={dropdownTriggerIconClass(classNameOptions)}
               type='button'
            >
               <div
                  className='border-2 w-5 h-5 rounded-lg border-(--color-input-trigger-border-color)'
                  style={{ backgroundColor: value }}
               />
            </button>
         </div>
      </div>
   );
};
export default Control;
