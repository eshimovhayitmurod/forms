import { IMaskInput } from 'react-imask';
import {
   containerClass,
   inputClass,
   triggerClass,
   triggerIconClass,
} from './classNames';
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
   return (
      <div
         className={containerClass()}
         data-disabled={isDisabled}
         data-error={!!error}
         onFocus={onFocus}
         ref={refs?.setReference}
      >
         <IMaskInput
            className={inputClass()}
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
         <div
            {...getReferenceProps()}
            className={triggerClass()}
            data-disabled={isDisabled}
            data-size={size}
         >
            <div
               className={triggerIconClass()}
               style={{ backgroundColor: value }}
            />
         </div>
      </div>
   );
};
export default Control;
