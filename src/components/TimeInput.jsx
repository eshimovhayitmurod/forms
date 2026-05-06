import { bool, func, oneOf, string } from 'prop-types';
import { memo } from 'react';
import { IMask, IMaskInput } from 'react-imask';
import { containerClass, errorClass, inputClass } from './classNames';
const maskOptions = {
   autofix: true,
   mask: 'HH:MM:SS',
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
const TimeInput = memo(
   ({
      'data-cy': dataCY,
      error = '',
      isDisabled = false,
      name,
      onBlur,
      onChange,
      onFocus,
      placeholder = '',
      ref,
      size = 'md',
      value = '',
   }) => {
      const isError = !!error;
      return (
         <div className={containerClass({ size })}>
            <IMaskInput
               {...maskOptions}
               className={inputClass({ size, error, baseClass: 'time-input' })}
               data-cy={dataCY}
               disabled={!!isDisabled}
               inputMode='numeric'
               inputRef={ref}
               name={name}
               onAccept={onChange}
               onBlur={onBlur}
               onFocus={onFocus}
               placeholder={placeholder}
               type='text'
               value={value}
            />
            {isError && <h5 className={errorClass({ size })}>{error}</h5>}
         </div>
      );
   },
);
TimeInput.propTypes = {
   'data-cy': string,
   error: bool,
   isDisabled: bool,
   name: string,
   onBlur: func,
   onChange: func,
   onFocus: func,
   placeholder: string,
   size: oneOf(['lg', 'md', 'sm']),
   value: string,
};
export default TimeInput;
