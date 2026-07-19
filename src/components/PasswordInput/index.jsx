import { any, bool, func, oneOf, oneOfType, shape, string } from 'prop-types';
import { memo, useRef, useState } from 'react';
import {
   containerClass,
   dropdownContainerClass,
   dropdownInputClass,
   dropdownTriggerClass,
   dropdownTriggerIconClass,
   errorClass,
} from '../classNames';
import Close from './Icons/Close';
import Open from './Icons/Open';
const PasswordInput = memo(
   ({
      'aria-label': ariaLabel,
      'data-cy': dataCY,
      containerClassName = '',
      disabled = false,
      dropdownContainerClassName = '',
      dropdownInputClassName = '',
      dropdownTriggerClassName = '',
      dropdownTriggerIconClassName = '',
      error = '',
      errorClassName = '',
      name,
      onBlur,
      onChange,
      onFocus,
      placeholder = '',
      ref,
      size = 'md',
      value = '',
   }) => {
      const [type, setType] = useState(false);
      const currentRef = useRef(null);
      const innerRef = ref ? ref : currentRef;
      const classNameOptions = {
         containerClassName,
         disabled: !!disabled,
         dropdownContainerClassName,
         dropdownInputClassName,
         dropdownTriggerClassName,
         dropdownTriggerIconClassName,
         error: !!error,
         errorClassName,
         size,
      };
      return (
         <div className={containerClass(classNameOptions)}>
            <div className={dropdownContainerClass(classNameOptions)}>
               <input
                  aria-label={ariaLabel}
                  className={dropdownInputClass(classNameOptions)}
                  data-cy={dataCY}
                  disabled={!!disabled}
                  name={name}
                  onBlur={onBlur}
                  onChange={e => onChange(e.target.value)}
                  onFocus={onFocus}
                  placeholder={placeholder}
                  ref={innerRef}
                  type={type ? 'text' : 'password'}
                  value={value}
               />
               <div className={dropdownTriggerClass(classNameOptions)}>
                  <button
                     className={dropdownTriggerIconClass(classNameOptions)}
                     disabled={disabled}
                     type='button'
                     onClick={() => {
                        setType(!type);
                        if (innerRef?.current) {
                           innerRef.current.focus();
                        }
                     }}
                  >
                     {type ? <Close /> : <Open />}
                  </button>
               </div>
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
PasswordInput.propTypes = {
   'aria-label': string,
   'data-cy': string,
   containerClassName: string,
   disabled: bool,
   dropdownContainerClassName: string,
   dropdownInputClassName: string,
   dropdownTriggerClassName: string,
   dropdownTriggerIconClassName: string,
   error: string,
   errorClassName: string,
   name: string,
   onBlur: func,
   onChange: func,
   onFocus: func,
   placeholder: string,
   ref: oneOfType([func, shape({ current: any })]),
   size: oneOf(['lg', 'md', 'sm']),
   value: string,
};
export default PasswordInput;
