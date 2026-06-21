import { useCallback, useMemo } from 'react';
import { useDebouncedCallback } from 'use-debounce';
const MenuHeader = ({
   getData,
   inputRef,
   search = '',
   searchPlaceholder,
   setActiveIndex,
   setFilter,
   type = 'select',
}) => {
   const placeholder = useMemo(() => {
      const isValid =
         ['string', 'number'].includes(typeof searchPlaceholder) &&
         searchPlaceholder;
      const placeholder = isValid ? searchPlaceholder : 'Search...';
      return placeholder;
   }, [searchPlaceholder]);
   const debouncedSearch = useDebouncedCallback(
      filter => {
         getData(filter);
      },
      [300],
   );
   const onInputChange = e => {
      const search = e.target.value;
      const filter = { search, page: 1 };
      setFilter(filter);
      setActiveIndex(0);
      if (type === 'autocomplete') {
         debouncedSearch(filter);
      }
   };
   const onKeyDown = useCallback(
      e => {
         if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveIndex(0);
         }
      },
      [setActiveIndex],
   );
   return (
      <div className='group h-11.75 pt-1.75 px-1.5 pb-0'>
         <input
            className='bg-transparent rounded-[7px] border-2 border-solid text-[15px] font-medium h-10 outline-none pl-3 pr-9 w-full placeholder:text-[#717171] text-[#000000] border-[#e1e1e1] focus:border-[#3a79f3]'
            onChange={onInputChange}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            ref={inputRef}
            type='text'
            value={search}
         />
         <span className='items-center flex h-6 justify-center absolute right-3.75 top-3.75 w-6 z-[-1] text-[#949494] group-focus-within:text-[#3a79f3]'>
            <svg
               fill='none'
               height='21'
               stroke='currentColor'
               strokeLinecap='round'
               strokeLinejoin='round'
               strokeWidth='2'
               viewBox='0 0 24 24'
               width='21'
            >
               <circle cx='11' cy='11' r='8' />
               <line x1='21' y1='21' x2='16.65' y2='16.65' />
            </svg>
         </span>
      </div>
   );
};
export default MenuHeader;
