import { any, bool, func, oneOfType, shape, string } from 'prop-types';
import { Fragment, memo, useEffect, useRef } from 'react';
import { options } from './constants';
import Control from './Control';
import Menu from './Menu';
import useDropdown from './useDropdown';
const TimeInput = memo(
   ({
      'aria-label': ariaLabel,
      'data-cy': dataCY,
      containerClassName = '',
      disabled = false,
      dropdownContainerClassName = '',
      dropdownInputClassName = '',
      dropdownTriggerClassName = '',
      dropdownTriggerIconClassName = '',
      error = '',
      name,
      onBlur,
      onChange,
      onFocus,
      placeholder = '',
      ref,
      seconds = true,
      size = 'md',
      value,
      errorClassName = '',
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
      } = useDropdown({ disabled, listRef });
      useEffect(() => {
         listRef.current = [];
         for (let i = 0; i < optionsCount; i++) {
            listRef.current[i] = null;
         }
      }, [optionsCount, listRef]);
      return (
         <Fragment>
            <Control
               ariaLabel={ariaLabel}
               containerClassName={containerClassName}
               dataCY={dataCY}
               disabled={disabled}
               dropdownContainerClassName={dropdownContainerClassName}
               dropdownInputClassName={dropdownInputClassName}
               dropdownTriggerClassName={dropdownTriggerClassName}
               dropdownTriggerIconClassName={dropdownTriggerIconClassName}
               error={error}
               errorClassName={errorClassName}
               getReferenceProps={getReferenceProps}
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
   'aria-label': string,
   'data-cy': string,
   containerClassName: string,
   disabled: bool,
   dropdownContainerClassName: string,
   dropdownInputClassName: string,
   dropdownTriggerClassName: string,
   dropdownTriggerIconClassName: string,
   error: string,
   errorClassName: string,
   name: string,
   onChange: func,
   onFocus: func,
   placeholder: string,
   ref: oneOfType([func, shape({ current: any })]),
   value: any,
};
export default TimeInput;
