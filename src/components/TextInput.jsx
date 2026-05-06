import { bool, func, oneOf, string } from 'prop-types';
import { memo } from 'react';
import { containerClass, errorClass, inputClass } from './classNames';
const TextInput = memo(
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
            <input
               className={inputClass({ size, error, baseClass: 'text-input' })}
               data-cy={dataCY}
               disabled={!!isDisabled}
               name={name}
               onBlur={onBlur}
               onChange={e => onChange(e.target.value)}
               onFocus={onFocus}
               placeholder={placeholder}
               ref={ref}
               type='text'
               value={value}
            />
            {isError && <h5 className={errorClass({ size })}>{error}</h5>}
         </div>
      );
   },
);
TextInput.propTypes = {
   'data-cy': string,
   error: string,
   isDisabled: bool,
   name: string,
   onBlur: func,
   onChange: func,
   onFocus: func,
   placeholder: string,
   size: oneOf(['lg', 'md', 'sm']),
   value: string,
};
export default TextInput;
