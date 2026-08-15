import { any, bool, func, oneOf, oneOfType, shape, string } from 'prop-types';
import { memo, useId, useMemo, useRef, useState } from 'react';
import { IMaskInput } from 'react-imask';
import {
   containerClass,
   inputClass,
   inputContainerClass,
   inputSuffixClass,
} from './classNames';
import ClearButton from './components/ClearButton';
import ErrorMessage from './components/ErrorMessage';
import Spinner from './components/Spinner';
const PhoneInput = memo(
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
      const errorId = useId();
      const ref = useRef(null);
      const currentRef = innerRef ? innerRef : ref;
      const [lazy, setLazy] = useState(true);
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
               <IMaskInput
                  aria-describedby={error ? errorId : undefined}
                  aria-invalid={!!error}
                  aria-label={ariaLabel}
                  className={inputClass(classNameOptions)}
                  data-cy={dataCY}
                  disabled={!!disabled}
                  id={id}
                  inputMode='numeric'
                  inputRef={currentRef}
                  lazy={lazy}
                  mask='+998 (00) 000 00 00'
                  name={name}
                  placeholder={placeholder}
                  placeholderChar=' '
                  type='text'
                  value={value}
                  onAccept={(value, event) => {
                     const cleaned = value.replace(/\D/g, '');
                     const newValue =
                        cleaned === '998' ? '' : value.replace(/\)|\(| /g, '');
                     onChange(newValue, { event });
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
            <ErrorMessage size={size} id={errorId} error={error} />
         </div>
      );
   },
);
PhoneInput.propTypes = {
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
export default PhoneInput;
