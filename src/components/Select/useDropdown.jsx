import {
   autoUpdate,
   flip,
   offset,
   size,
   useClick,
   useDismiss,
   useFloating,
   useInteractions,
   useListNavigation,
   useRole,
} from '@floating-ui/react';
import { useMemo, useRef, useState } from 'react';
import { defaultFilter } from './constants';
const useDropdown = ({
   getData,
   isDisabled = false,
   listRef,
   options = [],
   setFilter,
   type,
}) => {
   const mountedRef = useRef(false);
   const [activeIndex, setActiveIndex] = useState(0);
   const [open, setOpen] = useState(false);
   const enabled = useMemo(() => !isDisabled, [isDisabled]);
   const disabledIndices = useMemo(() => {
      const disabledIndices = options
         .map((option = {}, index = 0) => ({
            ...option,
            index,
         }))
         .filter(option => option?.isDisabled)
         .map(option => option?.index);
      return disabledIndices;
   }, [options]);
   const { refs, floatingStyles, context } = useFloating({
      open,
      whileElementsMounted: autoUpdate,
      onOpenChange: open => {
         setActiveIndex(0);
         setOpen(open);
         if (
            !isDisabled &&
            !mountedRef.current &&
            open &&
            type === 'autocomplete'
         ) {
            mountedRef.current = true;
            getData(defaultFilter);
            setFilter(defaultFilter);
         }
      },
      middleware: [
         offset(0),
         flip({ padding: 10 }),
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
   const role = useRole(context, { role: 'listbox' });
   const dismiss = useDismiss(context);
   const click = useClick(context, { enabled });
   const listNavigation = useListNavigation(context, {
      activeIndex,
      disabledIndices,
      listRef,
      loop: false,
      onNavigate: setActiveIndex,
      selectedIndex: null,
      virtual: true,
   });
   const { getReferenceProps, getFloatingProps, getItemProps } =
      useInteractions([click, role, dismiss, listNavigation]);
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
export default useDropdown;
