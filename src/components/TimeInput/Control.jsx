import { Fragment } from 'react';
import { IMask, IMaskInput } from 'react-imask';
import {
   dropdownContainerClass,
   dropdownInputClass,
   dropdownTriggerClass,
   dropdownTriggerIconClass,
   inputErrorClass,
} from '../classNames';
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
   dataCY,
   error = '',
   getReferenceProps,
   isDisabled = false,
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
   const isError = !!error;
   const classNameOptions = { disabled: isDisabled, error, size };
   return (
      <Fragment>
         <div
            className={dropdownContainerClass(classNameOptions)}
            onFocus={onFocus}
            ref={refs?.setReference}
         >
            <IMaskInput
               {...maskOptions}
               className={dropdownInputClass(classNameOptions)}
               data-cy={dataCY}
               disabled={isDisabled}
               inputMode='numeric'
               inputRef={ref}
               mask={seconds ? 'HH:MM:SS' : 'HH:MM'}
               name={name}
               onAccept={onChange}
               onBlur={onBlur}
               placeholder={placeholder}
               type='text'
               value={value}
            />
            <div className={dropdownTriggerClass(classNameOptions)}>
               <button
                  {...getReferenceProps()}
                  className={dropdownTriggerIconClass(classNameOptions)}
                  disabled={isDisabled}
                  type='button'
               >
                  <svg
                     fill='currentColor'
                     height={size === 'lg' ? 22 : size === 'sm' ? 20 : 22}
                     viewBox='0 0 24 24'
                     width={size === 'lg' ? 22 : size === 'sm' ? 20 : 22}
                  >
                     <path d='M12,2A10,10,0,1,0,22,12,10.01146,10.01146,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.00917,8.00917,0,0,1,12,20Zm1-8.251V7a1,1,0,0,0-2,0v5a1.00586,1.00586,0,0,0,.11816.47217l1.5,2.79883a1.00029,1.00029,0,0,0,1.76368-.94434Z' />
                  </svg>
               </button>
            </div>
         </div>
         {isError && (
            <h5 className={inputErrorClass(classNameOptions)}>{error}</h5>
         )}
      </Fragment>
   );
};
export default Control;
