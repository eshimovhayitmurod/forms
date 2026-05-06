import { any, bool, oneOf, string } from 'prop-types';
import { memo } from 'react';
const sizeClasses = {
   lg: 'text-[16px] pb-[4px]',
   md: 'text-[14px] pb-[3px]',
   sm: 'text-[12px] pb-[2px]',
};
const Label = memo(({ children, isRequired = false, htmlFor, size = 'md' }) => (
   <label
      className={`inline-flex items-center font-medium text-[#949494] ${sizeClasses[size]}`}
      htmlFor={htmlFor}
   >
      {children}
      {isRequired && (
         <strong className='text-[#d32f2f] font-bold ml-1'>*</strong>
      )}
   </label>
));
Label.propTypes = {
   children: any,
   htmlFor: string,
   isRequired: bool,
   size: oneOf(['lg', 'md', 'sm']),
};
export default Label;
