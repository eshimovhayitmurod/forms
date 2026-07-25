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
import { memo, useCallback, useMemo, useRef } from 'react';
import {
   containerClass,
   inputClass,
   inputContainerClass,
   inputSuffixClass,
} from './classNames';
import ClearButton from './components/ClearButton';
import ErrorMessage from './components/ErrorMessage';
import Spinner from './components/Spinner';
import { normalizeNumberString, parseValue } from './helpers/numberInput';
const NumberInput = memo(
   ({
      'aria-label': ariaLabel,
      'data-cy': dataCY,
      clearable = false,
      disabled = false,
      error = '',
      id,
      loading = false,
      max,
      min,
      name,
      normalizeOnBlur = true,
      onBlur,
      onChange,
      onFocus,
      placeholder = '',
      ref: innerRef,
      scale = 2,
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
      const memoizedValue = useMemo(() => {
         const isValid = typeof value === 'string';
         const memoizedValue = isValid ? value : String(value);
         return memoizedValue;
      }, [value]);
      const onChangeInput = useCallback(
         event => {
            const value = parseValue(event.target.value, { scale, min, max });
            onChange(value, { event });
         },
         [onChange, min, max, scale],
      );
      const onBlurInput = useCallback(
         event => {
            const value = event.target.value;
            const newValue = normalizeNumberString(value);
            if (value !== newValue && normalizeOnBlur) {
               onChange(newValue, { event });
            }
            if (typeof onBlur === 'function') {
               onBlur(event);
            }
         },
         [onBlur, onChange, normalizeOnBlur],
      );
      return (
         <div className={containerClass(classNameOptions)}>
            <div className={inputContainerClass(classNameOptions)}>
               <input
                  aria-label={ariaLabel}
                  className={inputClass(classNameOptions)}
                  data-cy={dataCY}
                  disabled={disabled}
                  id={id}
                  inputMode='numeric'
                  name={name}
                  onBlur={onBlurInput}
                  onChange={onChangeInput}
                  onFocus={onFocus}
                  placeholder={placeholder}
                  ref={currentRef}
                  type='text'
                  value={memoizedValue}
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
NumberInput.propTypes = {
   'aria-label': string,
   'data-cy': string,
   clearable: bool,
   disabled: bool,
   error: string,
   id: string,
   loading: bool,
   max: any,
   min: any,
   name: string,
   normalizeOnBlur: bool,
   onBlur: func,
   onChange: func,
   onFocus: func,
   placeholder: string,
   ref: oneOfType([func, shape({ current: any })]),
   scale: number,
   size: oneOf(['lg', 'md', 'sm']),
   value: string,
};
export default NumberInput;
