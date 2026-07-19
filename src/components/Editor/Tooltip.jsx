import {
   autoUpdate,
   flip,
   FloatingPortal,
   offset,
   shift,
   useClick,
   useDismiss,
   useFloating,
   useFocus,
   useHover,
   useInteractions,
   useRole,
} from '@floating-ui/react';
import { Fragment, useState } from 'react';
const Tooltip = ({
   children,
   distance = 6,
   isDisabled = false,
   title = '',
}) => {
   const [isOpen, setIsOpen] = useState(false);
   const { refs, floatingStyles, context } = useFloating({
      middleware: [offset(distance), flip(), shift()],
      onOpenChange: setIsOpen,
      open: isOpen,
      placement: 'top',
      whileElementsMounted: autoUpdate,
   });
   const click = useClick(context, { enabled: !isDisabled });
   const dismiss = useDismiss(context, { enabled: !isDisabled });
   const focus = useFocus(context, { enabled: !isDisabled });
   const hover = useHover(context, { move: true, enabled: !isDisabled });
   const role = useRole(context, { role: 'tooltip' });
   const { getReferenceProps, getFloatingProps } = useInteractions([
      click,
      dismiss,
      focus,
      hover,
      role,
   ]);
   return (
      <Fragment>
         <div {...getReferenceProps()} ref={node => refs.setReference(node)}>
            {children}
         </div>
         {isOpen && (
            <FloatingPortal id='floating-ui-portal'>
               <div
                  {...getFloatingProps()}
                  className='bg-[#141414] text-[#f2f2f2] rounded-[10px] text-[13px] font-medium py-1.5 px-3 whitespace-pre-line w-max max-w-75 z-50 shadow-[0_0_20px_2px_rgba(0,0,0,0.12)]'
                  ref={node => refs.setFloating(node)}
                  style={floatingStyles}
               >
                  {title}
               </div>
            </FloatingPortal>
         )}
      </Fragment>
   );
};
export default Tooltip;
