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
import { memo, useMemo, useRef } from 'react';
import {
   containerClass,
   inputClass,
   inputContainerClass,
   inputSuffixClass,
} from './classNames';
import ClearButton from './components/ClearButton';
import ErrorMessage from './components/ErrorMessage';
import Spinner from './components/Spinner';
const TextInput = memo(
   ({
      'aria-label': ariaLabel,
      'data-cy': dataCY,
      clearable = false,
      disabled = false,
      error = '',
      id,
      loading = false,
      maxLength = 255,
      name,
      onBlur,
      onChange,
      onFocus,
      placeholder = '',
      ref: innerRef,
      size = 'md',
      value = '',
   }) => {
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
         loading: !!loading,
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
                  ref={currentRef}
                  type='text'
                  value={value}
               />
               {hasSuffix && (
                  <div className={inputSuffixClass(classNameOptions)}>
                     {loading ? (
                        <Spinner />
                     ) : (
                        <ClearButton onChange={onChange} ref={currentRef} />
                     )}
                  </div>
               )}
            </div>
            <ErrorMessage size={size} error={error} />
         </div>
      );
   },
);
TextInput.propTypes = {
   'aria-label': string,
   'data-cy': string,
   clearable: bool,
   disabled: bool,
   error: string,
   id: string,
   loading: bool,
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
