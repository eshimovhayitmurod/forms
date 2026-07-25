import {
   any,
   bool,
   func,
   number,
   oneOf,
   oneOfType,
   shape,
   string,
} from 'prop-types';
import { memo } from 'react';
import {
   containerClass,
   textareaClass,
   textareaContainerClass,
} from './classNames';
import ErrorMessage from './components/ErrorMessage';
const Textarea = memo(
   ({
      'aria-label': ariaLabel,
      'data-cy': dataCY,
      disabled = false,
      error = '',
      id,
      maxLength = 1000,
      name,
      onBlur,
      onChange,
      onFocus,
      placeholder = '',
      ref,
      size = 'md',
      value = '',
   }) => {
      const classNameOptions = {
         error: !!error,
         size,
      };
      return (
         <div className={containerClass(classNameOptions)}>
            <div className={textareaContainerClass(classNameOptions)}>
               <textarea
                  aria-label={ariaLabel}
                  className={textareaClass(classNameOptions)}
                  data-cy={dataCY}
                  disabled={!!disabled}
                  id={id}
                  maxLength={maxLength}
                  name={name}
                  onBlur={onBlur}
                  onChange={event => onChange(event.target.value, { event })}
                  onFocus={onFocus}
                  placeholder={placeholder}
                  ref={ref}
                  value={value}
               />
            </div>
            <ErrorMessage size={size} error={error} />
         </div>
      );
   },
);
Textarea.propTypes = {
   'aria-label': string,
   'data-cy': string,
   disabled: bool,
   error: string,
   id: string,
   maxLength: number,
   name: string,
   onBlur: func,
   onChange: func,
   onFocus: func,
   placeholder: string,
   ref: oneOfType([func, shape({ current: any })]),
   size: oneOf(['lg', 'md', 'sm']),
   value: string,
};
export default Textarea;
