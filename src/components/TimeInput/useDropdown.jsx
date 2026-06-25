import {
   autoUpdate,
   flip,
   offset,
   shift,
   size,
   useClick,
   useDismiss,
   useFloating,
   useInteractions,
   useListNavigation,
   useRole,
} from '@floating-ui/react';
import { any, bool, func, string } from 'prop-types';
import { useState } from 'react';
const useDropdown = ({ isDisabled = false, listRef }) => {
   const [open, setOpen] = useState(false);
   const [activeIndex, setActiveIndex] = useState(0);
   const { refs, floatingStyles, context } = useFloating({
      open,
      whileElementsMounted: autoUpdate,
      onOpenChange: open => {
         setOpen(open);
         setActiveIndex(0);
      },
      middleware: [
         offset(0),
         flip({ fallbackAxisSideDirection: 'end' }),
         shift(),
         size({
            apply({ rects, elements, availableHeight }) {
               Object.assign(elements.floating.style, {
                  maxHeight: `${availableHeight}px`,
                  minWidth: `${rects.reference.width}px`,
                  width: `${rects.reference.width}px`,
               });
            },
         }),
      ],
   });
   const click = useClick(context, { enabled: !isDisabled });
   const dismiss = useDismiss(context);
   const role = useRole(context);
   const listNavigation = useListNavigation(context, {
      activeIndex,
      listRef,
      loop: false,
      onNavigate: setActiveIndex,
      selectedIndex: null,
      virtual: true,
   });
   const { getReferenceProps, getFloatingProps, getItemProps } =
      useInteractions([click, dismiss, role, listNavigation]);
   return {
      activeIndex,
      context,
      floatingStyles,
      getFloatingProps,
      getItemProps,
      getReferenceProps,
      open,
      refs,
      setActiveIndex,
      setOpen,
   };
};
useDropdown.propTypes = {
   isDisabled: bool,
   isError: bool,
   onChange: func,
   onFocus: func,
   placeholder: string,
   value: any,
};
export default useDropdown;
