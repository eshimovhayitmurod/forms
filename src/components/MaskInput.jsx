import { any, bool, func, oneOf, oneOfType, shape, string } from 'prop-types';
import { memo, useMemo } from 'react';
import { IMaskInput } from 'react-imask';
import {
   containerClass,
   errorClass,
   inputClass,
   inputContainerClass,
} from './classNames';
const types = [
   {
      mask: '00000000000000000000',
      transform: value => value,
      value: 'account',
   },
   {
      mask: '000000000',
      transform: value => value,
      value: 'tin',
   },
   {
      mask: '00000',
      transform: value => value,
      value: 'mfo',
   },
   {
      mask: 'aa 0000000',
      transform: value => value.replace(' ', '').toUpperCase(),
      value: 'passport',
   },
   {
      mask: '00000000000000',
      transform: value => value,
      value: 'pinfl',
   },
   {
      mask: '00/00',
      transform: value => value,
      value: 'card-expire',
   },
   {
      mask: '0000 0000 0000 0000',
      transform: value => value.replace(/ /g, ''),
      value: 'card',
   },
   {
      mask: [{ mask: '00 a 000 aa' }, { mask: '00 000 aaa' }],
      transform: value => value.toUpperCase(),
      value: 'transport-number',
   },
];
const typesList = types.map(type => type?.value);
const MaskInput = memo(
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
      type = 'tin',
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
      const inputMode = useMemo(
         () => (type === 'passport' && value?.length < 2 ? 'latin' : 'numeric'),
         [type, value],
      );
      const newType = useMemo(
         () => (typesList.includes(type) ? type : 'tin'),
         [type],
      );
      const transform = useMemo(() => {
         const transform = types.find(
            type => type?.value === newType,
         )?.transform;
         return transform;
      }, [newType]);
      const mask = useMemo(() => {
         const mask = types.find(type => type?.value === newType)?.mask;
         return mask;
      }, [newType]);
      return (
         <div className={containerClass(classNameOptions)}>
            <div className={inputContainerClass(classNameOptions)}>
               <IMaskInput
                  aria-label={ariaLabel}
                  className={inputClass(classNameOptions)}
                  data-cy={dataCY}
                  disabled={disabled}
                  id={id}
                  inputMode={inputMode}
                  inputRef={ref}
                  mask={mask}
                  name={name}
                  onBlur={onBlur}
                  onFocus={onFocus}
                  placeholder={placeholder}
                  type='text'
                  value={value}
                  onAccept={(value, event) => {
                     onChange(transform(value), { event });
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
MaskInput.propTypes = {
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
   size: oneOf(['large', 'medium', 'small']),
   type: oneOf(typesList),
   value: string,
};
export default MaskInput;
