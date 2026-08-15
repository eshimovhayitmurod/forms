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
import dateFormatter from '../helpers/dateFormatter';
import Down from '../Icons/Down';
const Control = ({
   ariaLabel,
   clearable = false,
   dataCY,
   disabled = false,
   error = '',
   getReferenceProps,
   id,
   loading = false,
   max,
   min,
   name,
   onBlur,
   onChange,
   onFocus,
   placeholder = '',
   ref,
   refs,
   size = 'md',
   value = '',
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
   const memoizedValue = useMemo(() => {
      const stringValue = typeof value === 'string' ? value : '';
      const memoizedValue = stringValue.split('-').reverse().join('-');
      return memoizedValue;
   }, [value]);
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
               autofix={true}
               className={dropdownInputClass(classNameOptions)}
               data-cy={dataCY}
               disabled={disabled}
               format={date => dateFormatter(date).format('DD-MM-YYYY')}
               id={id}
               inputMode='numeric'
               inputRef={ref}
               lazy={true}
               mask={Date}
               name={name}
               onBlur={onBlur}
               onFocus={onFocus}
               overwrite={true}
               parse={date => dateFormatter(date, 'DD-MM-YYYY')}
               pattern='DD-MM-YYYY'
               placeholder={placeholder}
               placeholderChar=''
               type='text'
               value={memoizedValue}
               blocks={{
                  DD: {
                     mask: IMask.MaskedRange,
                     from: 1,
                     to: 31,
                     maxLength: 2,
                  },
                  MM: {
                     mask: IMask.MaskedRange,
                     from: 1,
                     to: 12,
                     maxLength: 2,
                  },
                  YYYY: {
                     mask: IMask.MaskedRange,
                     from: 1900,
                     to: 9999,
                  },
               }}
               onChange={event => {
                  const value = event.target.value;
                  const input = value.split('-').reverse().join('-');
                  if (value?.length === 10) {
                     const inputDate = new Date(input).getTime();
                     const maxDate = max ? max.getTime() : null;
                     const minDate = min ? min.getTime() : null;
                     const newValue =
                        inputDate > maxDate && maxDate
                           ? new Date(maxDate).toISOString().slice(0, 10)
                           : inputDate < minDate && minDate
                             ? new Date(minDate).toISOString().slice(0, 10)
                             : input;
                     onChange(newValue, { event });
                     return;
                  } else {
                     onChange(input, { event });
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
                  <Down />
               </div>
            </div>
         </div>
         <ErrorMessage size={size} id={errorId} error={error} />
      </div>
   );
};
export default Control;
