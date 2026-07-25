import { useMemo } from 'react';
import { IMask, IMaskInput } from 'react-imask';
import {
   containerClass,
   dropdownContainerClass,
   dropdownInputClass,
   dropdownTriggerClass,
   dropdownTriggerIconClass,
} from '../classNames';
import ErrorMessage from '../components/ErrorMessage';
import Clock from '../Icons/Clock';
const maskOptions = {
   autofix: true,
   blocks: {
      HH: {
         from: 0,
         mask: IMask.MaskedRange,
         maxLength: 2,
         to: 23,
      },
      MM: {
         from: 0,
         mask: IMask.MaskedRange,
         maxLength: 2,
         to: 59,
      },
      SS: {
         from: 0,
         mask: IMask.MaskedRange,
         maxLength: 2,
         to: 59,
      },
   },
};
const Control = ({
   ariaLabel,
   containerClassName = '',
   dataCY,
   disabled = false,
   dropdownContainerClassName = '',
   dropdownInputClassName = '',
   dropdownTriggerClassName = '',
   dropdownTriggerIconClassName = '',
   error = '',
   errorClassName = '',
   getReferenceProps,
   id,
   name,
   onBlur,
   onChange,
   onFocus,
   placeholder = '',
   ref,
   refs,
   seconds = true,
   size = 'md',
   value,
}) => {
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
   const widthAndHeight = useMemo(() => {
      const widthAndHeight = size === 'lg' ? 22 : size === 'sm' ? 20 : 22;
      return widthAndHeight;
   }, [size]);
   return (
      <div className={containerClass(classNameOptions)}>
         <div
            className={dropdownContainerClass(classNameOptions)}
            ref={node => refs?.setReference(node)}
         >
            <IMaskInput
               {...maskOptions}
               aria-label={ariaLabel}
               className={dropdownInputClass(classNameOptions)}
               data-cy={dataCY}
               disabled={disabled}
               id={id}
               inputMode='numeric'
               inputRef={ref}
               mask={seconds ? 'HH:MM:SS' : 'HH:MM'}
               name={name}
               onBlur={onBlur}
               onFocus={onFocus}
               placeholder={placeholder}
               type='text'
               value={value}
               onAccept={(value, event) => {
                  onChange(value, { event });
               }}
            />
            <div className={dropdownTriggerClass(classNameOptions)}>
               <div
                  {...getReferenceProps()}
                  className={dropdownTriggerIconClass(classNameOptions)}
               >
                  <Clock height={widthAndHeight} width={widthAndHeight} />
               </div>
            </div>
         </div>
         <ErrorMessage size={size} error={error} />
      </div>
   );
};
export default Control;
