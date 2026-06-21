import { useMemo } from 'react';
const NoOptions = ({
   searchValue,
   getData,
   noOptionsMessage,
   CustomNoOptions,
}) => {
   const noOptions = useMemo(() => {
      const isValid = typeof noOptionsMessage === 'string' && noOptionsMessage;
      const noOptions = isValid ? noOptionsMessage : 'No data';
      return noOptions;
   }, [noOptionsMessage]);
   if (CustomNoOptions) {
      return <CustomNoOptions searchValue={searchValue} getData={getData} />;
   }
   return (
      <div className='items-center text-[#717171] flex text-[16px] font-medium h-full justify-center'>
         {noOptions}
      </div>
   );
};
export default NoOptions;
