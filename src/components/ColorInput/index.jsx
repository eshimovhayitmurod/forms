import { any, bool, func, oneOf, oneOfType, shape, string } from 'prop-types';
import { Fragment, memo } from 'react';
import Control from './Control';
import Menu from './Menu';
import useDropdown from './useDropdown';
const ColorInput = memo(
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
      errorClassName = '',
      id,
      name,
      onBlur,
      onChange,
      onFocus,
      placeholder = '',
      ref,
      size = 'md',
      value,
   }) => {
      const {
         context,
         floatingStyles,
         getFloatingProps,
         getReferenceProps,
         open,
         refs,
      } = useDropdown({ disabled });
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
               id={id}
               name={name}
               onBlur={onBlur}
               onChange={onChange}
               onFocus={onFocus}
               placeholder={placeholder}
               ref={ref}
               refs={refs}
               size={size}
               value={value}
            />
            <Menu
               context={context}
               floatingStyles={floatingStyles}
               getFloatingProps={getFloatingProps}
               onChange={onChange}
               open={open}
               refs={refs}
               value={value}
            />
         </Fragment>
      );
   },
);
ColorInput.propTypes = {
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
   id: string,
   name: string,
   onBlur: func,
   onChange: func,
   onFocus: func,
   placeholder: string,
   ref: oneOfType([func, shape({ current: any })]),
   size: oneOf(['sm', 'md', 'lg']),
   value: any,
};
export default ColorInput;
