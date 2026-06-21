import { memo, useMemo } from 'react';
import DefaultOption from './DefaultOption';
import IkpuOption from './IkpuOption';
import SignOption from './SignOption';
const Option = memo(
   ({
      CustomOption,
      activeIndex = 0,
      dataCY = '',
      getItemProps,
      index = 0,
      isMultiple = false,
      listRef,
      onSelect,
      option,
      renderOptionType,
      setActiveIndex,
      value,
   }) => {
      const isDisabled = option?.isDisabled;
      const disabled = useMemo(() => !!isDisabled, [isDisabled]);
      const isFocused = useMemo(
         () => activeIndex === index && !disabled,
         [activeIndex, index, disabled],
      );
      const isSelected = useMemo(() => {
         const newValue = Array.isArray(value) ? value : [];
         const some = newValue.some(value => value?.value === option?.value);
         const isSelected = isMultiple ? some : value?.value === option?.value;
         return isSelected;
      }, [isMultiple, value, option]);
      const innerRef = {
         ...getItemProps({
            onClick: () => {
               if (!disabled) {
                  onSelect(index);
               }
            },
            onPointerMove: () => {
               if (index !== activeIndex) {
                  setActiveIndex(index);
               }
            },
         }),
         'aria-disabled': disabled,
         'aria-selected': isSelected,
         'data-cy': dataCY ? `${dataCY}-${String(option?.value)}` : undefined,
         ref: node => (listRef.current[index] = node),
         role: 'option',
         tabIndex: -1,
      };
      const OptionComponent = useMemo(() => {
         const OptionComponent =
            renderOptionType === 'default'
               ? DefaultOption
               : renderOptionType === 'sign'
                 ? SignOption
                 : renderOptionType === 'ikpu'
                   ? IkpuOption
                   : renderOptionType === 'custom' &&
                       ['function', 'object'].includes(typeof CustomOption)
                     ? CustomOption
                     : DefaultOption;
         return OptionComponent;
      }, [renderOptionType, CustomOption]);
      return (
         <OptionComponent
            activeIndex={activeIndex}
            index={index}
            innerRef={innerRef}
            isFocused={isFocused}
            isMultiple={isMultiple}
            isSelected={isSelected}
            option={option}
            value={value}
         />
      );
   },
);
export default Option;
