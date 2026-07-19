import {
   any,
   bool,
   func,
   number,
   oneOf,
   oneOfType,
   shape,
   string,
} from 'prop-types';
import { memo } from 'react';
import {
   containerClass,
   errorClass,
   inputClass,
   inputContainerClass,
} from './classNames';
const TextInput = memo(
   ({
      'aria-label': ariaLabel,
      'data-cy': dataCY = '',
      containerClassName = '',
      disabled = false,
      error = '',
      errorClassName = '',
      id,
      inputClassName = '',
      inputContainerClassName = '',
      maxLength = 255,
      name,
      onBlur,
      onChange,
      onFocus,
      placeholder = '',
      ref,
      size = 'md',
      value = '',
   }) => {
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
               <input
                  aria-label={ariaLabel}
                  className={inputClass(classNameOptions)}
                  data-cy={dataCY}
                  disabled={!!disabled}
                  id={id}
                  maxLength={maxLength}
                  name={name}
                  onBlur={onBlur}
                  onChange={event => onChange(event.target.value, { event })}
                  onFocus={onFocus}
                  placeholder={placeholder}
                  ref={ref}
                  type='text'
                  value={value}
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
TextInput.propTypes = {
   'aria-label': string,
   'data-cy': string,
   containerClassName: string,
   disabled: bool,
   error: string,
   errorClassName: string,
   id: string,
   inputClassName: string,
   inputContainerClassName: string,
   maxLength: number,
   name: string,
   onBlur: func,
   onChange: func,
   onFocus: func,
   placeholder: string,
   ref: oneOfType([func, shape({ current: any })]),
   size: oneOf(['lg', 'md', 'sm']),
   value: string,
};
export default TextInput;
