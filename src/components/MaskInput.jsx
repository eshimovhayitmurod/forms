import { any, bool, func, oneOf, oneOfType, shape, string } from 'prop-types';
import { memo, useMemo, useRef } from 'react';
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
      type = 'tin',
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
                  inputRef={currentRef}
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
MaskInput.propTypes = {
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
   type: oneOf(typesList),
   value: string,
};
export default MaskInput;
