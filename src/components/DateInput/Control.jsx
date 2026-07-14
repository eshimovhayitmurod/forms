import { useMemo } from 'react';
import { IMask, IMaskInput } from 'react-imask';
import {
   dropdownContainerClass,
   dropdownInputClass,
   dropdownTriggerClass,
   dropdownTriggerIconClass,
} from '../classNames';
import dateFormatter from './dateFormatter';
import Down from './Icons/Down';
const Control = ({
   dataCY,
   getReferenceProps,
   isDisabled = false,
   error = '',
   max,
   min,
   name,
   onBlur,
   onChange,
   onFocus,
   placeholder = '',
   refs,
   size = 'md',
   value = '',
}) => {
   const classNameOptions = { disabled: isDisabled, error, size };
   const memoizedValue = useMemo(() => {
      const stringValue = typeof value === 'string' ? value : '';
      const memoizedValue = stringValue.split('-').reverse().join('-');
      return memoizedValue;
   }, [value]);
   return (
      <div
         className={dropdownContainerClass(classNameOptions)}
         ref={node => refs.setReference(node)}
      >
         <IMaskInput
            autofix={true}
            className={dropdownInputClass(classNameOptions)}
            data-cy={dataCY}
            disabled={isDisabled}
            format={date => dateFormatter(date).format('DD-MM-YYYY')}
            inputMode='numeric'
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
            onChange={e => {
               const value = e.target.value;
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
                  onChange(newValue);
                  return;
               } else {
                  onChange(input);
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
               <Down />
            </button>
         </div>
      </div>
   );
};
export default Control;
