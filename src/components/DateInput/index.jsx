import { any, bool, func, oneOf, oneOfType, shape, string } from 'prop-types';
import { Fragment, memo, useMemo, useRef, useState } from 'react';
import Control from './Control';
import Menu from './Menu';
import useDropdown from './useDropdown';
const DateInput = memo(
   ({
      'aria-label': ariaLabel,
      'data-cy': dataCY,
      clearable = false,
      disabled = false,
      error = '',
      id,
      loading = false,
      maxDate = '',
      minDate = '',
      name,
      onBlur,
      onChange,
      onFocus,
      placeholder = '',
      ref: innerRef,
      size = 'md',
      value = '',
   }) => {
      const ref = useRef(null);
      const currentRef = innerRef ? innerRef : ref;
      const [calendar, setCalendar] = useState(new Date());
      const {
         getReferenceProps,
         getFloatingProps,
         refs,
         floatingStyles,
         context,
         setOpen,
         open,
      } = useDropdown({
         disabled,
         setCalendar,
         value,
      });
      const min = useMemo(() => {
         if (typeof minDate !== 'string') return undefined;
         const regex = /^\d{4}-\d{2}-\d{2}$/;
         if (!regex.test(minDate)) return undefined;
         const date = new Date(minDate);
         const [year, month, day] = minDate.split('-').map(Number);
         const isValid =
            date.getUTCFullYear() === year &&
            date.getUTCMonth() + 1 === month &&
            date.getUTCDate() === day;
         return isValid ? date : undefined;
      }, [minDate]);
      const max = useMemo(() => {
         if (typeof maxDate !== 'string') return undefined;
         const regex = /^\d{4}-\d{2}-\d{2}$/;
         if (!regex.test(maxDate)) return undefined;
         const date = new Date(maxDate);
         const [year, month, day] = maxDate.split('-').map(Number);
         const isValid =
            date.getUTCFullYear() === year &&
            date.getUTCMonth() + 1 === month &&
            date.getUTCDate() === day;
         return isValid ? date : undefined;
      }, [maxDate]);
      return (
         <Fragment>
            <Control
               ariaLabel={ariaLabel}
               clearable={clearable}
               dataCY={dataCY}
               disabled={disabled}
               error={error}
               getReferenceProps={getReferenceProps}
               id={id}
               loading={loading}
               max={max}
               min={min}
               name={name}
               onBlur={onBlur}
               onChange={onChange}
               onFocus={onFocus}
               placeholder={placeholder}
               ref={currentRef}
               refs={refs}
               size={size}
               value={value}
            />
            <Menu
               calendar={calendar}
               context={context}
               floatingStyles={floatingStyles}
               getFloatingProps={getFloatingProps}
               max={max}
               min={min}
               onChange={onChange}
               open={open}
               refs={refs}
               setCalendar={setCalendar}
               setOpen={setOpen}
            />
         </Fragment>
      );
   },
);
DateInput.propTypes = {
   'aria-label': string,
   'data-cy': string,
   clearable: bool,
   disabled: bool,
   error: string,
   id: string,
   loading: bool,
   maxDate: string,
   minDate: string,
   name: string,
   onBlur: func,
   onChange: func,
   onFocus: func,
   placeholder: string,
   ref: oneOfType([func, shape({ current: any })]),
   size: oneOf(['sm', 'md', 'lg']),
   value: string,
};
export default DateInput;
