import { useMemo } from 'react';
const DefaultOption = ({
   innerRef = {},
   isFocused = false,
   isSelected = false,
   option = {},
}) => {
   const label = option?.label;
   const memoizedLabel = useMemo(() => {
      const isValid = ['string', 'number'].includes(typeof label) && label;
      const memoizedLabel = isValid ? label : '';
      return memoizedLabel;
   }, [label]);
   const background = useMemo(
      () => (isFocused ? '#3a79f333' : 'none'),
      [isFocused],
   );
   const width = useMemo(() => {
      const width = isSelected ? 'calc(100% - 24px)' : '100%';
      return width;
   }, [isSelected]);
   return (
      <div
         {...innerRef}
         className='flex min-h-11 h-auto w-full max-w-full items-center justify-between rounded-[7px] border-none py-1 pr-2 pl-3 text-black outline-none cursor-pointer aria-disabled:cursor-not-allowed aria-disabled:text-[#949494]'
         style={{ background }}
      >
         <div
            className='overflow-hidden text-ellipsis whitespace-nowrap font-medium text-base min-[400px]:text-base'
            style={{ width }}
         >
            {memoizedLabel}
         </div>
         {isSelected ? (
            <div className='flex items-center justify-center'>
               <svg height='24' viewBox='0 0 24 24' width='24'>
                  <path
                     fill='#3a79f3'
                     d='M12,22A10,10,0,1,0,2,12,10,10,0,0,0,12,22ZM8.293,11.293a.9994.9994,0,0,1,1.414,0L11,12.5859,14.293,9.293a1,1,0,0,1,1.414,1.414l-4,4a.9995.9995,0,0,1-1.414,0l-2-2A.9994.9994,0,0,1,8.293,11.293Z'
                  />
               </svg>
            </div>
         ) : null}
      </div>
   );
};
export default DefaultOption;
