import { useId, useMemo } from 'react';
import { IMaskInput } from 'react-imask';
import {
   containerClass,
   dropdownContainerClass,
   dropdownInputClass,
   dropdownTriggerClass,
   dropdownTriggerIconClass,
} from '../classNames';
import ClearButton from '../components/ClearButton';
import ErrorMessage from '../components/ErrorMessage';
import Spinner from '../components/Spinner';
const Control = ({
   ariaLabel,
   clearable = false,
   disabled = false,
   error = '',
   getReferenceProps,
   id,
   loading = false,
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
   const errorId = useId();
   const hasSuffix = useMemo(
      () => !!loading || (!!clearable && !disabled && value),
      [loading, clearable, disabled, value],
   );
   const classNameOptions = {
      clearable: !!clearable,
      disabled: !!disabled,
      error: !!error,
      hasSuffix,
      loading: !!loading,
      size,
   };
   return (
      <div className={containerClass(classNameOptions)}>
         <div
            className={dropdownContainerClass(classNameOptions)}
            ref={node => refs?.setReference(node)}
         >
            <IMaskInput
               aria-describedby={error ? errorId : undefined}
               aria-invalid={!!error}
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
               {hasSuffix &&
                  (loading ? (
                     <div className='w-6 h-6 flex items-center justify-center'>
                        <Spinner />
                     </div>
                  ) : (
                     <ClearButton onChange={onChange} ref={ref} />
                  ))}
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
         <ErrorMessage size={size} id={errorId} error={error} />
      </div>
   );
};
export default Control;
