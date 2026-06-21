import { any, array, bool, elementType, func, oneOf, string } from 'prop-types';
import {
   Fragment,
   memo,
   useCallback,
   useEffect,
   useMemo,
   useRef,
   useState,
} from 'react';
import { api } from './api';
import { defaultFilter } from './constants';
import Container from './Container';
import Menu from './Menu';
import useDropdown from './useDropdown';
const parseData = response => {
   const results = response?.data?.results;
   const hasMore = !!response?.data?.next;
   const options = Array.isArray(results) ? results : [];
   const newOptions = options.map(apiData => ({
      apiData,
      label: apiData?.name,
      value: apiData?.id,
   }));
   return { options: newOptions, hasMore };
};
const Select = memo(
   ({
      'data-cy': dataCY,
      NoOptions: CustomNoOptions,
      Option,
      className = '',
      getResponse,
      isClearable = true,
      isDisabled = false,
      isError = false,
      isMultiple = false,
      isSearchable = true,
      noOptionsMessage,
      onBlur,
      onChange,
      onFocus,
      options = [],
      placeholder,
      renderOptionType = 'default', // default | ikpu | sign | custom
      searchPlaceholder,
      service, // api service
      size = 'medium',
      type = 'select', // select | autocomplete
      url,
      value,
   }) => {
      const abortController = useRef(null);
      const inputRef = useRef(null);
      const listRef = useRef([]);
      const [apiOptions, setApiOptions] = useState([]);
      const [filter, setFilter] = useState(defaultFilter);
      const [hasMore, setHasMore] = useState(false);
      const [loading, setLoading] = useState(false);
      const search = filter?.search;
      const page = filter?.page;
      const memoizedOptions = useMemo(() => {
         const newOptions = Array.isArray(options) ? options : [];
         const filteredOptions = newOptions.filter(option => {
            const label = String(option?.label).toLowerCase().trim();
            const newSearch = String(search).toLowerCase().trim();
            const isMatch = label.includes(newSearch);
            return isMatch;
         });
         const newApiOptions = Array.isArray(apiOptions) ? apiOptions : [];
         const memoizedOptions =
            type === 'select' ? filteredOptions : newApiOptions;
         return memoizedOptions;
      }, [options, apiOptions, type, search]);
      const getData = useCallback(
         async ({ search = '', page = 1 }) => {
            if (abortController?.current) {
               abortController?.current?.abort();
            }
            abortController.current = new AbortController();
            const signal = abortController?.current?.signal;
            setLoading(true);
            try {
               const isFunction = typeof url === 'function';
               const newSearch = search ? '&search=' + search : '';
               const newPage = page ? '&page=' + page : '';
               const newUrl = isFunction
                  ? url({ search, page })
                  : `${url}?${newSearch}${newPage}`;
               const options = { url: newUrl, signal };
               const apiService = typeof service === 'function' ? service : api;
               const response = await apiService(options);
               const transformedResponse =
                  typeof getResponse === 'function'
                     ? getResponse(response, { page, search })
                     : parseData(response);
               const hasMore = transformedResponse?.hasMore;
               setHasMore(hasMore);
               setApiOptions(apiOptions => {
                  const options = transformedResponse?.options;
                  const newOptions = Array.isArray(options) ? options : [];
                  const newApiOptions =
                     page > 1 ? [...apiOptions, ...newOptions] : newOptions;
                  return newApiOptions;
               });
            } catch (error) {
               if (!error?.code !== 'ERR_CANCELED') {
                  if (page === 1) {
                     setApiOptions([]);
                  }
                  setHasMore(false);
               }
            } finally {
               if (!signal?.aborted) {
                  setLoading(false);
               }
            }
         },
         [getResponse, url, service],
      );
      const {
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
      } = useDropdown({
         getData,
         isDisabled,
         listRef,
         options: memoizedOptions,
         setFilter,
         type,
      });
      useEffect(() => {
         if (page === 1) {
            listRef.current = [];
            listRef.current.null = inputRef.current;
            for (let i = 0; i < memoizedOptions?.length; i++) {
               listRef.current[i] = null;
            }
         }
      }, [memoizedOptions?.length, listRef, inputRef, page]);
      return (
         <Fragment>
            <Container
               className={className}
               dataCY={dataCY}
               getReferenceProps={getReferenceProps}
               isClearable={isClearable}
               isDisabled={isDisabled}
               isError={isError}
               isMultiple={isMultiple}
               onBlur={onBlur}
               onChange={onChange}
               onFocus={onFocus}
               placeholder={placeholder}
               refs={refs}
               setOpen={setOpen}
               size={size}
               value={value}
            />
            <Menu
               CustomOption={Option}
               activeIndex={activeIndex}
               apiOptions={apiOptions}
               context={context}
               dataCY={dataCY}
               filter={filter}
               floatingStyles={floatingStyles}
               getData={getData}
               getFloatingProps={getFloatingProps}
               getItemProps={getItemProps}
               hasMore={hasMore}
               inputRef={inputRef}
               isMultiple={isMultiple}
               isSearchable={isSearchable}
               listRef={listRef}
               loading={loading}
               noOptionsMessage={noOptionsMessage}
               CustomNoOptions={CustomNoOptions}
               onChange={onChange}
               open={open}
               options={memoizedOptions}
               refs={refs}
               renderOptionType={renderOptionType}
               searchPlaceholder={searchPlaceholder}
               setActiveIndex={setActiveIndex}
               setFilter={setFilter}
               setOpen={setOpen}
               type={type}
               value={value}
            />
         </Fragment>
      );
   },
);
Select.propTypes = {
   'data-cy': string,
   Option: func,
   className: string,
   getResponse: func,
   isClearable: bool,
   isDisabled: bool,
   isError: bool,
   isMultiple: bool,
   isSearchable: bool,
   noOptionsMessage: string,
   NoOptions: elementType,
   onBlur: func,
   onFocus: func,
   options: array,
   placeholder: string,
   searchPlaceholder: string,
   service: func,
   size: oneOf(['small', 'medium', 'large']),
   type: 'select',
   url: any,
   value: any,
   renderOptionType: oneOf([
      'default',
      'ikpu',
      'sign',
      'warehouse',
      'usedPeriod',
      'custom',
   ]),
};
export default Select;
