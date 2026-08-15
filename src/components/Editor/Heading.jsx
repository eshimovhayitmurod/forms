import {
   FloatingFocusManager,
   FloatingPortal,
   useClick,
   useDismiss,
   useFloating,
   useInteractions,
   useListNavigation,
   useRole,
   useTransitionStyles,
} from '@floating-ui/react';
import { Fragment, useRef, useState } from 'react';
const options = [
   { level: 1, label: 'Heading 1' },
   { level: 2, label: 'Heading 2' },
   { level: 3, label: 'Heading 3' },
   { level: 4, label: 'Heading 4' },
   { level: 5, label: 'Heading 5' },
   { level: 6, label: 'Heading 6' },
];
const Heading = ({ editor, disabled = false }) => {
   const listRef = useRef([]);
   const [activeIndex, setActiveIndex] = useState(0);
   const [open, setOpen] = useState(false);
   const { refs, floatingStyles, context } = useFloating({
      open,
      placement: 'bottom-end',
      strategy: 'fixed',
      onOpenChange: open => {
         setOpen(open);
         setActiveIndex(0);
      },
   });
   const { styles, isMounted } = useTransitionStyles(context, {
      common: { transformOrigin: 'top center' },
      duration: 300,
      initial: { opacity: 0, transform: 'scale(0.7)' },
      open: { opacity: 1, transform: 'scale(1)' },
   });
   const click = useClick(context, { enabled: !disabled });
   const dismiss = useDismiss(context);
   const role = useRole(context, { role: 'listbox' });
   const listNavigation = useListNavigation(context, {
      activeIndex,
      listRef,
      loop: false,
      onNavigate: setActiveIndex,
      selectedIndex: null,
      virtual: false,
   });
   const { getReferenceProps, getFloatingProps, getItemProps } =
      useInteractions([click, dismiss, role, listNavigation]);
   return (
      <Fragment>
         <button
            {...getReferenceProps()}
            aria-expanded={open}
            aria-haspopup='listbox'
            className='not-disabled:hover:bg-[#f1f1f1] data-[active=true]:bg-[#e2e2e2] disabled:bg-transparent text-[#292b32] rounded-[10px] cursor-pointer items-center flex text-[14px] font-medium outline-none border-none pl-2.5 pr-0.5'
            data-active={!!editor.isActive('heading')}
            disabled={disabled}
            type='button'
            ref={node => {
               refs.setReference(node);
            }}
         >
            <span>Heading</span>
            <span className='dropdown-icon'>
               <svg fill='none' height='24' viewBox='0 0 25 24' width='25'>
                  <path
                     d='M16.5 10L12.5 14L8.5 10'
                     stroke='currentColor'
                     strokeLinecap='round'
                     strokeLinejoin='round'
                     strokeWidth='1.5'
                  />
               </svg>
            </span>
         </button>
         {isMounted && (
            <FloatingPortal id='floating-ui-portal'>
               <FloatingFocusManager
                  context={context}
                  initialFocus={-1}
                  modal={false}
               >
                  <div
                     {...getFloatingProps()}
                     className='outline-none'
                     ref={node => refs?.setFloating(node)}
                     style={floatingStyles}
                     tabIndex={-1}
                  >
                     <div
                        className='bg-[#ffffff] backdrop-blur-[5px] p-1 shadow-[0_0_20px_rgba(0,0,0,0.08)] rounded-[15px] overflow-hidden'
                        style={styles}
                     >
                        {options.map((heading, index) => (
                           <button
                              {...getItemProps({
                                 onClick: () => {
                                    setOpen(false);
                                    editor
                                       .chain()
                                       .focus()
                                       .toggleHeading({ level: heading?.level })
                                       .run();
                                 },
                                 onPointerMove: () => {
                                    if (index !== activeIndex) {
                                       setActiveIndex(index);
                                    }
                                 },
                              })}
                              aria-selected={false}
                              className='w-full px-3 hover:bg-[#f1f5f9] hover:text-[#3a79f3] focus:bg-[#f1f5f9] focus:text-[#3a79f3] rounded-xl cursor-pointer text-[14px] text-[#292B32] font-medium outline-none border-none h-9 flex items-center'
                              key={index}
                              ref={node => (listRef.current[index] = node)}
                              role='option'
                              tabIndex={-1}
                           >
                              {heading?.label}
                           </button>
                        ))}
                     </div>
                  </div>
               </FloatingFocusManager>
            </FloatingPortal>
         )}
      </Fragment>
   );
};
export default Heading;
