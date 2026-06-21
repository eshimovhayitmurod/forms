import { useMemo } from 'react';
import DropdownContainer from './DropdownContainer';
import Placeholder from './Placeholder';
import ValueContainer from './ValueContainer';
const Container = ({
   className = '',
   dataCY,
   getReferenceProps,
   isClearable = true,
   isDisabled = false,
   isError = false,
   isMultiple = false,
   onBlur,
   onChange,
   onFocus,
   placeholder = '',
   refs,
   setOpen,
   size = 'medium',
   value,
}) => {
   const hasValue = useMemo(() => {
      const newValue = Array.isArray(value) ? value : [];
      const hasMultipleValue = newValue?.length > 0;
      const hasSingleValue = !!(value?.label || value?.value);
      const hasValue = isMultiple ? hasMultipleValue : hasSingleValue;
      return hasValue;
   }, [value, isMultiple]);
   const ClassName = useMemo(() => {
      const baseClass =
         "flex w-full items-center justify-between bg-transparent rounded-[10px] border-[2px] border-[#dedede] text-black outline-none min-h-11 hover:border-[#3a79f3] focus:border-[#3a79f3] `data-[size='large']:min-h-[52px]` `data-[size='small']:rounded-lg` `data-[size='small']:min-h-[36px]` `data-[error='true']:border-[#e41d32]` `data-[disabled='true']:bg-[#f4f4f4]` `data-[disabled='true']:border-[#dedede]` `data-[disabled='true']:text-[#717171]`";
      const ClassName = className + baseClass;
      return ClassName;
   }, [className]);
   const padding = useMemo(() => {
      const padding =
         isMultiple && hasValue
            ? size === 'small'
               ? '4px 8px 4px 4px'
               : '4px 12px 4px 4px'
            : size === 'small'
              ? '4px 8px 4px 10px'
              : '4px 12px 4px 15px';
      return padding;
   }, [isMultiple, hasValue, size]);
   return (
      <div
         className="group w-full rounded-[10px] cursor-pointer outline-none min-h-11 [*]:box-border `data-[size='large']:min-h-[52px]` data-[size='small']:rounded-lg `data-[size='small']:min-h-[36px]` data-[disabled='true']:cursor-default"
         data-size={size}
         data-disabled={!!isDisabled}
      >
         <div
            {...getReferenceProps()}
            className={ClassName}
            data-cy={dataCY}
            data-disabled={!!isDisabled}
            data-error={!!isError}
            data-size={size}
            onBlur={onBlur}
            onFocus={onFocus}
            ref={refs?.setReference}
            style={{ padding }}
            tabIndex={0}
         >
            {hasValue ? (
               <ValueContainer
                  isClearable={isClearable}
                  isDisabled={isDisabled}
                  isMultiple={isMultiple}
                  onChange={onChange}
                  setOpen={setOpen}
                  size={size}
                  value={value}
               />
            ) : (
               <Placeholder placeholder={placeholder} />
            )}
            <DropdownContainer
               isClearable={isClearable}
               isDisabled={isDisabled}
               isMultiple={isMultiple}
               onChange={onChange}
               setOpen={setOpen}
               value={value}
            />
         </div>
      </div>
   );
};
export default Container;
