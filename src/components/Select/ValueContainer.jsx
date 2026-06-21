import { memo, useCallback, useMemo } from 'react';
const MultipleValue = memo(
   ({
      index = 0,
      isDisabled = false,
      onChange,
      setOpen,
      size = 'medium',
      value,
      valueList = [],
   }) => {
      const label = value?.label;
      const valueLabel = useMemo(() => {
         const isValid = ['string', 'number'].includes(typeof label) && label;
         const valueLabel = isValid ? label : '';
         return valueLabel;
      }, [label]);
      const clearable = useMemo(() => !isDisabled, [isDisabled]);
      const removeOption = useCallback(
         e => {
            e.preventDefault();
            e.stopPropagation();
            const newValueList = valueList.filter(
               (_, order = 0) => order !== index,
            );
            onChange(newValueList);
            setOpen(false);
         },
         [index, setOpen, onChange, valueList],
      );
      return (
         <div
            className="group flex items-center bg-[#f1f1f1] rounded-lg cursor-default max-w-full min-h-8.5 pt-1 pb-1 pr-1.75 pl-2.5 `data-[size='large']:min-h-[42px]` data-[size='large']:rounded-[10px] `data-[size='small']:min-h-[22px]` data-[size='small']:pt-0.5 data-[size='small']:pb-0.5 `data-[size='small']:pr-[7px]` data-[size='small']:pl-2.5 data-[disabled='true']:bg-white"
            data-disabled={!!isDisabled}
            data-size={size}
         >
            <div className="font-medium text-base mr-1 whitespace-nowrap w-[calc(100%-25px)] data-[size='large']:text-[17px] group-data-[disabled='true']:w-full">
               {valueLabel}
            </div>
            {clearable && (
               <div
                  className='flex items-center justify-center h-5.5 w-5.5 cursor-pointer'
                  onClick={removeOption}
               >
                  <svg
                     fill='#949494'
                     height='18'
                     viewBox='0 0 20 20'
                     width='18'
                  >
                     <path d='M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z'></path>
                  </svg>
               </div>
            )}
         </div>
      );
   },
);
const ValueContainer = ({
   isClearable = false,
   isDisabled = false,
   isMultiple = false,
   onChange,
   setOpen,
   size = 'medium',
   value,
}) => {
   const label = value?.label;
   const width = useMemo(
      () => (isClearable ? 'calc(100% - 44px)' : 'calc(100% - 24px)'),
      [isClearable],
   );
   const multiple = useMemo(() => !!isMultiple, [isMultiple]);
   const valueList = useMemo(
      () => (Array.isArray(value) ? value : []),
      [value],
   );
   const valueLabel = useMemo(() => {
      const isValid = ['string', 'number'].includes(typeof label) && label;
      const valueLabel = isValid ? label : '';
      return valueLabel;
   }, [label]);
   return (
      <div className='select-none' style={{ width }}>
         {multiple ? (
            <div className='flex flex-wrap gap-1'>
               {valueList.map((value, index = 0) => (
                  <MultipleValue
                     index={index}
                     isDisabled={isDisabled}
                     key={index}
                     onChange={onChange}
                     setOpen={setOpen}
                     size={size}
                     value={value}
                     valueList={valueList}
                  />
               ))}
            </div>
         ) : (
            <div className='overflow-hidden text-ellipsis whitespace-nowrap text-base font-medium'>
               {valueLabel}
            </div>
         )}
      </div>
   );
};
export default ValueContainer;
