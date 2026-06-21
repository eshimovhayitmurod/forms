import { FloatingFocusManager, FloatingPortal } from '@floating-ui/react';
import { HexAlphaColorPicker } from 'react-colorful';
import { menuClass } from './classNames';
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
                  className={menuClass()}
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
