import { bool, func, oneOf, string } from 'prop-types';
import { Fragment, memo, useRef, useState } from 'react';
import {
   dropdownContainerClass,
   dropdownInputClass,
   dropdownTriggerClass,
   dropdownTriggerIconClass,
   inputErrorClass,
} from '../classNames';
import CloseIcon from './CloseIcon';
import OpenIcon from './OpenIcon';
const PasswordInput = memo(
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
      const [type, setType] = useState(false);
      const currentRef = useRef(null);
      const innerRef = ref ? ref : currentRef;
      const classNameOptions = { size, error, disabled: isDisabled };
      return (
         <Fragment>
            <div className={dropdownContainerClass(classNameOptions)}>
               <input
                  className={dropdownInputClass(classNameOptions)}
                  data-cy={dataCY}
                  disabled={!!isDisabled}
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
                     disabled={isDisabled}
                     type='button'
                     onClick={() => {
                        setType(!type);
                        if (innerRef?.current) {
                           innerRef.current.focus();
                        }
                     }}
                  >
                     {type ? <CloseIcon /> : <OpenIcon />}
                  </button>
               </div>
            </div>
            {!!error && (
               <h5 className={inputErrorClass(classNameOptions)}>{error}</h5>
            )}
         </Fragment>
      );
   },
);
PasswordInput.propTypes = {
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
export default PasswordInput;
