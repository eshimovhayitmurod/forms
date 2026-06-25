import { FloatingFocusManager, FloatingPortal } from '@floating-ui/react';
import { HexAlphaColorPicker } from 'react-colorful';
const Menu = ({
   context,
   floatingStyles,
   getFloatingProps,
   onChange,
   open,
   refs,
   value,
}) => {
   return (
      open && (
         <FloatingPortal id='floating-ui-portal'>
            <FloatingFocusManager
               context={context}
               initialFocus={false}
               modal={false}
            >
               <div
                  {...getFloatingProps()}
                  className='rounded-[14px] p-3 bg-(--color-input-menu-bg-color) shadow-[0_1px_20px_0_rgba(13,46,105,0.07),0_1px_20px_0_rgba(13,46,105,0.07)]'
                  ref={refs?.setFloating}
                  style={floatingStyles}
               >
                  <HexAlphaColorPicker color={value} onChange={onChange} />
               </div>
            </FloatingFocusManager>
         </FloatingPortal>
      )
   );
};
export default Menu;
