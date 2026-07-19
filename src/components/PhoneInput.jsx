import { any, bool, func, oneOf, oneOfType, shape, string } from 'prop-types';
import { memo, useState } from 'react';
import { IMaskInput } from 'react-imask';
import {
   containerClass,
   errorClass,
   inputClass,
   inputContainerClass,
} from './classNames';
const PhoneInput = memo(
   ({
      'aria-label': ariaLabel,
      'data-cy': dataCY,
      containerClassName = '',
      disabled = false,
      error = '',
      errorClassName = '',
      id,
      inputClassName = '',
      inputContainerClassName = '',
      name,
      onBlur,
      onChange,
      onFocus,
      placeholder = '',
      ref,
      size = 'md',
      value = '',
   }) => {
      const [lazy, setLazy] = useState(true);
      const classNameOptions = {
         containerClassName,
         disabled: !!disabled,
         error: !!error,
         errorClassName,
         inputClassName,
         inputContainerClassName,
         size,
      };
      return (
         <div className={containerClass(classNameOptions)}>
            <div className={inputContainerClass(classNameOptions)}>
               <IMaskInput
                  aria-label={ariaLabel}
                  className={inputClass(classNameOptions)}
                  data-cy={dataCY}
                  disabled={!!disabled}
                  id={id}
                  inputMode='numeric'
                  inputRef={ref}
                  lazy={lazy}
                  mask='+998 (00) 000 00 00'
                  name={name}
                  placeholder={placeholder}
                  placeholderChar=' '
                  type='text'
                  value={value}
                  onAccept={value => {
                     const cleaned = value.replace(/\D/g, '');
                     const newValue =
                        cleaned === '998' ? '' : value.replace(/\)|\(| /g, '');
                     onChange(newValue);
                  }}
                  onBlur={e => {
                     setLazy(true);
                     if (typeof onBlur === 'function') {
                        onBlur(e);
                     }
                  }}
                  onFocus={e => {
                     setLazy(false);
                     if (typeof onFocus === 'function') {
                        onFocus(e);
                     }
                  }}
               />
            </div>
            {!!error && (
               <h5 className={errorClass(classNameOptions)} role='alert'>
                  {error}
               </h5>
            )}
         </div>
      );
   },
);
PhoneInput.propTypes = {
   'aria-label': string,
   'data-cy': string,
   containerClassName: string,
   disabled: bool,
   error: string,
   errorClassName: string,
   id: string,
   inputClassName: string,
   inputContainerClassName: string,
   name: string,
   onBlur: func,
   onChange: func,
   onFocus: func,
   placeholder: string,
   ref: oneOfType([func, shape({ current: any })]),
   size: oneOf(['lg', 'md', 'sm']),
   value: string,
};
export default PhoneInput;
