import { FloatingFocusManager, FloatingPortal } from '@floating-ui/react';
import { useCallback } from 'react';
import { dropdownMenuClass } from '../classNames';
import Option from './Option';
const Menu = ({
   activeIndex,
   context,
   dataCY,
   floatingStyles,
   getFloatingProps,
   getItemProps,
   listRef,
   onChange,
   open,
   options = [],
   refs,
   setActiveIndex,
   setOpen,
   value,
}) => {
   const onSelect = useCallback(
      index => {
         const value = options?.[index]?.value;
         onChange(value);
         setActiveIndex(null);
         setOpen(false);
      },
      [setActiveIndex, setOpen, options, onChange],
   );
   return (
      open && (
         <FloatingPortal id='floating-ui-portal'>
            <FloatingFocusManager context={context} modal={false}>
               <div
                  {...getFloatingProps({
                     onKeyDown(e) {
                        if (e.key === 'Enter' && activeIndex !== null) {
                           onSelect(activeIndex);
                        }
                     },
                  })}
                  className={dropdownMenuClass()}
                  ref={node => refs?.setFloating(node)}
                  style={{ ...floatingStyles, height: 192 }}
                  tabIndex={-1}
               >
                  <div className='h-full rounded-[14px] py-1.5 overflow-hidden'>
                     <div className='h-full px-1.5 overflow-auto'>
                        {options.map((option, index = 0) => (
                           <Option
                              activeIndex={activeIndex}
                              dataCY={dataCY}
                              getItemProps={getItemProps}
                              index={index}
                              key={index}
                              listRef={listRef}
                              onSelect={onSelect}
                              option={option}
                              setActiveIndex={setActiveIndex}
                              value={value}
                           />
                        ))}
                     </div>
                  </div>
               </div>
            </FloatingFocusManager>
         </FloatingPortal>
      )
   );
};
export default Menu;
