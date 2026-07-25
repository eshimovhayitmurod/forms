import { func } from 'prop-types';
import { memo, useCallback } from 'react';
import { clearButtonClass } from '../classNames';
const ClearButton = memo(({ onChange, ref }) => {
   const onClick = useCallback(
      event => {
         onChange('', { event });
         const focus = ref?.current?.focus;
         if (typeof focus === 'function') {
            ref?.current?.focus();
         }
      },
      [onChange, ref],
   );
   return (
      <button onClick={onClick} type='button' className={clearButtonClass()}>
         <svg fill='none' height='16' viewBox='0 0 16 16' width='16'>
            <path
               d='M12 4L4 12'
               stroke='currentColor'
               strokeLinecap='round'
               strokeLinejoin='round'
               strokeWidth='2'
            ></path>
            <path
               d='M4 4L12 12'
               stroke='currentColor'
               strokeLinecap='round'
               strokeLinejoin='round'
               strokeWidth='2'
            ></path>
         </svg>
      </button>
   );
});
ClearButton.propTypes = { onClick: func };
export default ClearButton;
