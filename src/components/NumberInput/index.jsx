import { any, bool, func, number, oneOf, string } from 'prop-types';
import { memo, useCallback, useMemo } from 'react';
import {
   inputClass,
   inputContainerClass,
   inputErrorClass,
} from '../classNames';
import { normalizeNumberString, parseValue } from './helpers';
const NumberInput = memo(
   ({
      'data-cy': dataCY,
      error = '',
      isDisabled = false,
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
      const isError = !!error;
      const classNameOptions = { size, error, disabled: isDisabled };
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
         <div className={inputContainerClass(classNameOptions)}>
            <input
               className={inputClass(classNameOptions)}
               data-cy={dataCY}
               disabled={isDisabled}
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
            {isError && (
               <h5 className={inputErrorClass(classNameOptions)}>{error}</h5>
            )}
         </div>
      );
   },
);
NumberInput.propTypes = {
   'data-cy': string,
   error: bool,
   isDisabled: bool,
   max: any,
   min: any,
   name: string,
   normalizeOnBlur: bool,
   onBlur: func,
   onChange: func,
   onFocus: func,
   placeholder: string,
   ref: any,
   scale: number,
   size: oneOf(['large', 'medium', 'small']),
   value: string,
};
export default NumberInput;
