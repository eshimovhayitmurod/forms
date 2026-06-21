const IkpuOption = ({
   innerRef = {},
   isFocused = false,
   isSelected = false,
   option = {},
}) => {
   return (
      <div
         data-focused={isFocused}
         data-selected={isSelected}
         className="min-h-11 w-full rounded-[7px] border-none bg-transparent py-1 pr-2 pl-3 cursor-pointer outline-none data-[focused='true']:bg-[#3a79f333]"
         {...innerRef}
      >
         {option?.apiData?.name ? (
            <div className='overflow-hidden text-ellipsis whitespace-nowrap text-base font-medium text-[#292b32] dark:text-white'>
               {option?.apiData?.name}
            </div>
         ) : (
            ''
         )}
         {option?.apiData?.mxik ? (
            <div className='text-sm font-normal text-[#949494]'>
               {option?.apiData?.mxik}
            </div>
         ) : (
            ''
         )}
      </div>
   );
};
export default IkpuOption;
