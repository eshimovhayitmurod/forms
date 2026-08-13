import { any, bool, func, oneOf, oneOfType, shape, string } from 'prop-types';
import { Fragment, memo, useRef } from 'react';
import Control from './Control';
import Menu from './Menu';
import useDropdown from './useDropdown';
const ColorInput = memo(
   ({
      'aria-label': ariaLabel,
      'data-cy': dataCY,
      clearable = false,
      disabled = false,
      error = '',
      id,
      loading = false,
      name,
      onBlur,
      onChange,
      onFocus,
      placeholder = '',
      ref: innerRef,
      size = 'md',
      value,
   }) => {
      const ref = useRef(null);
      const currentRef = innerRef ? innerRef : ref;
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
               clearable={clearable}
               dataCY={dataCY}
               disabled={disabled}
               error={error}
               getReferenceProps={getReferenceProps}
               id={id}
               loading={loading}
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
   clearable: bool,
   disabled: bool,
   error: string,
   id: string,
   loading: bool,
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
