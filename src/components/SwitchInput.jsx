import { bool, func, oneOf, string } from 'prop-types';
import { memo, useId } from 'react';
import styled from 'styled-components';
const StyledSwitchInput = styled.div`
   cursor: pointer;
   display: block;
   overflow: hidden;
   /* 52, 44, 36 */
   border-radius: 14px;
   height: 28px;
   min-width: 48px;
   width: 48px;
   &[data-size='large'] {
      border-radius: 18px;
      height: 32px;
      min-width: 56px;
      width: 56px;
      & label {
         border-radius: 18px;
         & span {
            border-radius: 12px;
            height: 24px;
            width: 24px;
         }
      }
   }
   &[data-size='small'] {
      border-radius: 12px;
      height: 24px;
      min-width: 40px;
      width: 40px;
      & label {
         border-radius: 12px;
         & span {
            border-radius: 8px;
            height: 16px;
            width: 16px;
         }
      }
   }
   & input {
      display: none;
      &:checked {
         & + label {
            background-color: #11734b;
            & span {
               transform: translateX(100%);
            }
         }
      }
   }
   .dark & input {
      &:checked {
         & + label {
            background-color: #11734b;
         }
      }
   }
   & label {
      background-color: #d1d5db;
      cursor: pointer;
      display: block;
      /* 52, 44, 36 */
      border-radius: 14px;
      height: 100%;
      padding: 4px;
      width: 100%;
      &:hover {
         background-color: #b7bcc5;
      }
      & span {
         background-color: #ffffff;
         display: block;
         transition:
            transform 400ms ease,
            background-color 400ms ease;
         /* 52, 44, 36 */
         height: 20px;
         border-radius: 10px;
         width: 20px;
      }
   }
   .dark & label {
      background-color: #515151;
   }
`;
const SwitchInput = memo(
   ({
      'data-cy': dataCY,
      id: innerId,
      isDisabled = false,
      name,
      onChange,
      size = 'medium',
      value = false,
   }) => {
      const id = useId();
      return (
         <StyledSwitchInput data-size={size}>
            <div class='inline-block relative w-12 h-7 cursor-pointer'>
               <input type='checkbox' class='peer hidden' />
               <label
                  class='
                     block w-full h-full p-1 rounded-[14px]
                     bg-gray-300 cursor-pointer
                     transition-colors duration-400
                     hover:bg-gray-400
                     peer-checked:bg-[#3a79f3]
                  '
               >
                  <span
                     class='
                           block w-5 h-5 bg-white rounded-[10px]
                           transition-all duration-400
                           peer-checked:translate-x-full
      '
                  ></span>
               </label>
            </div>
            <input
               checked={value}
               data-cy={dataCY}
               disabled={isDisabled}
               id={innerId || id}
               name={name}
               onChange={e => onChange(e.target.checked)}
               type='checkbox'
            />
            <label
               aria-labelledby={innerId || id}
               className='switch-input'
               htmlFor={innerId || id}
               tabIndex={-1}
            >
               <span></span>
            </label>
         </StyledSwitchInput>
      );
   },
);
SwitchInput.propTypes = {
   'data-cy': string,
   isDisabled: bool,
   name: string,
   onChange: func,
   size: oneOf(['large', 'medium', 'small']),
   value: bool,
};
export default SwitchInput;
