import { useId, useMemo } from 'react';
import { IMask, IMaskInput } from 'react-imask';
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
import Clock from '../Icons/Clock';
const maskOptions = {
   autofix: true,
   blocks: {
      HH: {
         from: 0,
         mask: IMask.MaskedRange,
         maxLength: 2,
         to: 23,
      },
      MM: {
         from: 0,
         mask: IMask.MaskedRange,
         maxLength: 2,
         to: 59,
      },
      SS: {
         from: 0,
         mask: IMask.MaskedRange,
         maxLength: 2,
         to: 59,
      },
   },
};
const Control = ({
   ariaLabel,
   clearable = false,
   dataCY,
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
   seconds = true,
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
   const widthAndHeight = useMemo(() => {
      const widthAndHeight = size === 'lg' ? 22 : size === 'sm' ? 20 : 22;
      return widthAndHeight;
   }, [size]);
   return (
      <div className={containerClass(classNameOptions)}>
         <div
            className={dropdownContainerClass(classNameOptions)}
            ref={node => refs?.setReference(node)}
         >
            <IMaskInput
               {...maskOptions}
               aria-describedby={error ? errorId : undefined}
               aria-invalid={!!error}
               aria-label={ariaLabel}
               className={dropdownInputClass(classNameOptions)}
               data-cy={dataCY}
               disabled={disabled}
               id={id}
               inputMode='numeric'
               inputRef={ref}
               mask={seconds ? 'HH:MM:SS' : 'HH:MM'}
               name={name}
               onBlur={onBlur}
               onFocus={onFocus}
               placeholder={placeholder}
               type='text'
               value={value}
               onAccept={(value, event) => {
                  onChange(value, { event });
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
                  <Clock height={widthAndHeight} width={widthAndHeight} />
               </div>
            </div>
         </div>
         <ErrorMessage size={size} id={errorId} error={error} />
      </div>
   );
};
export default Control;
