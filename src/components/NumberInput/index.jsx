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
import { memo, useCallback, useMemo } from 'react';
import {
   containerClass,
   errorClass,
   inputClass,
   inputContainerClass,
} from '../classNames';
import { normalizeNumberString, parseValue } from './helpers';
const NumberInput = memo(
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
      max,
      min,
      name,
      normalizeOnBlur = true,
      onBlur,
      onChange,
      onFocus,
      placeholder = '',
      ref,
      scale = 2,
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
      const memoizedValue = useMemo(() => {
         const isValid = typeof value === 'string';
         const memoizedValue = isValid ? value : String(value);
         return memoizedValue;
      }, [value]);
      const onChangeInput = useCallback(
         e => {
            const value = parseValue(e.target.value, { scale, min, max });
            onChange(value);
         },
         [onChange, min, max, scale],
      );
      const onBlurInput = useCallback(
         e => {
            const value = e.target.value;
            const newValue = normalizeNumberString(value);
            if (value !== newValue && normalizeOnBlur) {
               onChange(newValue);
            }
            if (typeof onBlur === 'function') {
               onBlur(e);
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
                  ref={ref}
                  type='text'
                  value={memoizedValue}
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
NumberInput.propTypes = {
   'aria-label': string,
   'data-cy': string,
   containerClassName: string,
   disabled: bool,
   error: string,
   errorClassName: string,
   id: string,
   inputClassName: string,
   inputContainerClassName: string,
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
   size: oneOf(['large', 'medium', 'small']),
   value: string,
};
export default NumberInput;
