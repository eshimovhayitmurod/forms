import { any, bool, func, string } from 'prop-types';
import { Fragment, memo, useEffect, useRef } from 'react';
import { options } from './constants';
import Control from './Control';
import Menu from './Menu';
import useDropdown from './useDropdown';
const TimeInput = memo(
   ({
      'data-cy': dataCY,
      error = '',
      isDisabled = false,
      name,
      onBlur,
      onChange,
      onFocus,
      placeholder = '',
      ref,
      seconds = true,
      size = 'md',
      value,
   }) => {
      const listRef = useRef([]);
      const optionsCount = options?.length;
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
      } = useDropdown({ isDisabled, listRef });
      useEffect(() => {
         listRef.current = [];
         for (let i = 0; i < optionsCount; i++) {
            listRef.current[i] = null;
         }
      }, [optionsCount, listRef]);
      return (
         <Fragment>
            <Control
               dataCY={dataCY}
               error={error}
               getReferenceProps={getReferenceProps}
               isDisabled={isDisabled}
               name={name}
               onBlur={onBlur}
               onChange={onChange}
               onFocus={onFocus}
               placeholder={placeholder}
               ref={ref}
               refs={refs}
               seconds={seconds}
               size={size}
               value={value}
            />
            <Menu
               activeIndex={activeIndex}
               context={context}
               floatingStyles={floatingStyles}
               getFloatingProps={getFloatingProps}
               getItemProps={getItemProps}
               listRef={listRef}
               onChange={onChange}
               open={open}
               options={options}
               refs={refs}
               setActiveIndex={setActiveIndex}
               setOpen={setOpen}
               value={value}
            />
         </Fragment>
      );
   },
);
TimeInput.propTypes = {
   isDisabled: bool,
   error: bool,
   onChange: func,
   onFocus: func,
   placeholder: string,
   value: any,
   name: string,
};
export default TimeInput;
