import { useMemo } from 'react';
const SignOption = ({
   innerRef = {},
   isFocused = false,
   isSelected = false,
   option = {},
}) => {
   const PINFL = option?.apiData?.PINFL;
   const TIN = option?.apiData?.TIN;
   const CN = option?.apiData?.CN;
   const O = option?.apiData?.O;
   const isBusiness = useMemo(() => {
      const TIN = !!option?.apiData?.TIN;
      const O = !!option?.apiData?.O;
      const isBusiness = O && TIN;
      return isBusiness;
   }, [option]);
   const validDate = useMemo(() => {
      const validDate = new Date(option?.apiData?.validTo || undefined)
         .toISOString()
         .slice(0, 10)
         .split('-')
         .reverse()
         .join('.');
      return validDate;
   }, [option]);
   return (
      <div
         data-focused={isFocused}
         data-selected={isSelected}
         style={{ background: isFocused ? '#11734b33' : 'none' }}
         className='min-h-11 w-full rounded-[10px] border-none bg-transparent p-2 pl-3 text-base font-medium text-black cursor-pointer outline-none aria-disabled:cursor-not-allowed aria-disabled:opacity-50'
         {...innerRef}
      >
         <div className='pb-1 text-[17px] overflow-hidden text-ellipsis whitespace-nowrap'>
            {O ? O : CN}
         </div>
         <div className='flex items-center gap-2.5'>
            <div className='rounded-[10px] border border-[#99999999] bg-[#f1f1f1] px-2.5 py-0.5 text-[15px] font-medium text-[#979797]'>
               {isBusiness ? TIN : PINFL}
            </div>
            <div className='rounded-[10px] border border-[#99999999] bg-[#f1f1f1] px-2.5 py-0.5 text-[15px] font-medium text-[#979797]'>
               to
               <span className='ms-1'>{validDate}</span>
            </div>
            {option?.isDisabled ? (
               <div className='rounded-[10px] bg-[#d32f2f] px-2.5 py-0.5 text-[15px] font-medium text-white'>
                  Expired
               </div>
            ) : null}
         </div>
      </div>
   );
};
export default SignOption;
