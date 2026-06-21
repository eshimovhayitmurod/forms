import { useMemo } from 'react';
const Placeholder = ({ placeholder = 'Select' }) => {
   const memoizedPlaceholder = useMemo(() => {
      const isValid = typeof placeholder === 'string' && placeholder;
      const memoizedPlaceholder = isValid ? placeholder : '';
      return memoizedPlaceholder;
   }, [placeholder]);
   return (
      <div className='text-[#949494] text-[16px] font-medium overflow-hidden w-[calc(100%-18px)] text-ellipsis whitespace-nowrap'>
         {memoizedPlaceholder}
      </div>
   );
};
export default Placeholder;
