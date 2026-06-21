import { FloatingFocusManager, FloatingPortal } from '@floating-ui/react';
import { useCallback, useMemo } from 'react';
import InfiniteScroller from './InfiniteScroller';
import Loading from './Loading';
import LoadingMore from './LoadingMore';
import MenuHeader from './MenuHeader';
import NoOptions from './NoOptions';
import Option from './Option';
import { defaultFilter } from './constants';
const defaultObject = {};
const defaultArray = [];
const Menu = ({
   CustomOption,
   activeIndex,
   context,
   dataCY = '',
   filter = defaultObject,
   floatingStyles,
   getData,
   getFloatingProps,
   getItemProps,
   hasMore = false,
   inputRef,
   isMultiple = false,
   isSearchable = true,
   listRef,
   loading = false,
   noOptionsMessage,
   CustomNoOptions,
   onChange,
   open = false,
   options = defaultArray,
   refs,
   renderOptionType,
   searchPlaceholder,
   setActiveIndex,
   setFilter,
   setOpen,
   type = 'select', // select | autocomplete
   value,
}) => {
   const hasData = useMemo(() => options?.length > 0, [options]);
   const search = filter?.search;
   const page = filter?.page;
   const searchable = useMemo(() => {
      const searchable = type === 'select' ? !!isSearchable : true;
      return searchable;
   }, [isSearchable, type]);
   const maxHeight = useMemo(() => {
      const length = options?.length;
      const searchHeight = searchable ? 47 : 0;
      const optionsCount =
         (loading && page === 1) || length === 0 ? 1 : length < 5 ? length : 5;
      const height =
         renderOptionType === 'default'
            ? CustomNoOptions && !hasData
               ? 80
               : 44
            : renderOptionType === 'sign'
              ? 74
              : renderOptionType === 'ikpu'
                ? 53
                : renderOptionType === 'warehouse'
                  ? 53
                  : 44;
      const optionsHeight = height * optionsCount;
      const padding = 12;
      const maxHeight = searchHeight + optionsHeight + padding;
      return maxHeight;
   }, [
      CustomNoOptions,
      hasData,
      loading,
      options,
      page,
      renderOptionType,
      searchable,
   ]);
   const isLoading = useMemo(() => {
      const isLoading = loading && page === 1;
      return isLoading;
   }, [loading, page]);
   const HasMore = useMemo(
      () => !!hasMore && type === 'autocomplete',
      [hasMore, type],
   );
   const loadMore = useCallback(() => {
      if (!loading && hasMore) {
         const newFilter = { search, page: page + 1 };
         getData(newFilter);
         setFilter(newFilter);
      }
   }, [page, getData, loading, search, setFilter, hasMore]);
   const onSelect = useCallback(
      index => {
         setOpen(false);
         setActiveIndex(null);
         const valueList = Array.isArray(value) ? value : [];
         const foundValue = options.find((_, order = 0) => order === index);
         const isSelected = valueList.some(
            value => value?.value === foundValue?.value,
         );
         const addedList = [...valueList, foundValue];
         const removedList = valueList.filter(
            value => value?.value !== foundValue?.value,
         );
         const multiValue = isSelected ? removedList : addedList;
         const newValue = isMultiple ? multiValue : foundValue;
         onChange(newValue);
         setFilter(defaultFilter);
         if (type === 'autocomplete') {
            getData(defaultFilter);
         }
      },
      [
         getData,
         isMultiple,
         onChange,
         options,
         setActiveIndex,
         setFilter,
         setOpen,
         type,
         value,
      ],
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
                  style={{
                     ...floatingStyles,
                     height: `${maxHeight}px`,
                     maxHeight: `${maxHeight}px`,
                  }}
                  className='bg-white! rounded-xl border-none! outline-none! overflow-hidden pb-1.5 shadow-[0_1px_20px_0_rgba(13,46,105,0.07)]'
                  ref={refs?.setFloating}
                  tabIndex={-1}
               >
                  {searchable && (
                     <MenuHeader
                        getData={getData}
                        inputRef={inputRef}
                        search={search}
                        searchPlaceholder={searchPlaceholder}
                        setActiveIndex={setActiveIndex}
                        setFilter={setFilter}
                        type={type}
                     />
                  )}
                  <div
                     className='pt-1.5'
                     style={{
                        height: searchable ? 'calc(100% - 47px)' : '100%',
                     }}
                  >
                     <div className='h-full overflow-auto px-1.5'>
                        {isLoading ? (
                           <Loading />
                        ) : hasData ? (
                           <InfiniteScroller
                              className='relative w-full overflow-hidden rounded-[7px] outline-none'
                              hasMore={HasMore}
                              initialLoad={false}
                              loadMore={loadMore}
                              pageStart={1}
                              tabIndex={0}
                              threshold={150}
                              useWindow={false}
                           >
                              {options.map((option, index = 0) => (
                                 <Option
                                    CustomOption={CustomOption}
                                    activeIndex={activeIndex}
                                    dataCY={dataCY}
                                    getItemProps={getItemProps}
                                    index={index}
                                    isMultiple={isMultiple}
                                    key={`${option?.value}_$${option?.label}_${index}`}
                                    listRef={listRef}
                                    onSelect={onSelect}
                                    option={option}
                                    renderOptionType={renderOptionType}
                                    setActiveIndex={setActiveIndex}
                                    value={value}
                                 />
                              ))}
                              {hasMore && <LoadingMore key={options?.length} />}
                           </InfiniteScroller>
                        ) : (
                           <NoOptions
                              searchValue={search}
                              getData={getData}
                              noOptionsMessage={noOptionsMessage}
                              CustomNoOptions={CustomNoOptions}
                           />
                        )}
                     </div>
                  </div>
               </div>
            </FloatingFocusManager>
         </FloatingPortal>
      )
   );
};
export default Menu;
