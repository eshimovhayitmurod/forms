import { any, bool, func, oneOf, oneOfType, shape, string } from 'prop-types';
import { memo, useMemo, useRef, useState } from 'react';
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
import Close from '../Icons/Close';
import Open from '../Icons/Open';
const PasswordInput = memo(
   ({
      'aria-label': ariaLabel,
      'data-cy': dataCY,
      clearable = false,
      disabled = false,
      error = '',
      id,
      loading = false,
      name,
      onBlur,
      onChange,
      onFocus,
      placeholder = '',
      ref: innerRef,
      size = 'md',
      value = '',
   }) => {
      const [type, setType] = useState(false);
      const ref = useRef(null);
      const currentRef = innerRef ? innerRef : ref;
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
            <div className={dropdownContainerClass(classNameOptions)}>
               <input
                  aria-label={ariaLabel}
                  className={dropdownInputClass(classNameOptions)}
                  data-cy={dataCY}
                  disabled={!!disabled}
                  id={id}
                  name={name}
                  onBlur={onBlur}
                  onChange={event => onChange(event.target.value, { event })}
                  onFocus={onFocus}
                  placeholder={placeholder}
                  ref={currentRef}
                  type={type ? 'text' : 'password'}
                  value={value}
               />
               <div className={dropdownTriggerClass(classNameOptions)}>
                  {hasSuffix &&
                     (loading ? (
                        <div className='w-6 h-6 flex items-center justify-center'>
                           <Spinner />
                        </div>
                     ) : (
                        <ClearButton onChange={onChange} ref={currentRef} />
                     ))}
                  <button
                     className={dropdownTriggerIconClass(classNameOptions)}
                     disabled={disabled}
                     type='button'
                     onClick={() => {
                        setType(!type);
                        if (currentRef?.current) {
                           currentRef.current.focus();
                        }
                     }}
                  >
                     {type ? <Close /> : <Open />}
                  </button>
               </div>
            </div>
            <ErrorMessage size={size} error={error} />
         </div>
      );
   },
);
PasswordInput.propTypes = {
   'aria-label': string,
   'data-cy': string,
   clearable: bool,
   disabled: bool,
   error: string,
   id: string,
   loading: bool,
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
