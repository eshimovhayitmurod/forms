import { FloatingFocusManager, FloatingPortal } from '@floating-ui/react';
import { HexAlphaColorPicker } from 'react-colorful';
import { dropdownMenuClass } from '../classNames';
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
                  className={dropdownMenuClass()}
                  ref={node => refs?.setFloating(node)}
                  style={floatingStyles}
               >
                  <div className='rounded-[14px] p-3'>
                     <HexAlphaColorPicker color={value} onChange={onChange} />
                  </div>
               </div>
            </FloatingFocusManager>
         </FloatingPortal>
      )
   );
};
export default Menu;
