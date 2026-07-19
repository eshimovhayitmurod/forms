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
   errorClass,
   textareaClass,
   textareaContainerClass,
} from './classNames';
const Textarea = memo(
   ({
      'aria-label': ariaLabel,
      'data-cy': dataCY,
      containerClassName = '',
      disabled = false,
      error = '',
      errorClassName = '',
      id,
      maxLength = 1000,
      name,
      onBlur,
      onChange,
      onFocus,
      placeholder = '',
      ref,
      size = 'md',
      textareaClassName = 'text',
      value = '',
   }) => {
      const classNameOptions = {
         containerClassName,
         error: !!error,
         errorClassName,
         size,
         textareaClassName,
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
            {!!error && (
               <h5 className={errorClass(classNameOptions)} role='alert'>
                  {error}
               </h5>
            )}
         </div>
      );
   },
);
Textarea.propTypes = {
   'aria-label': string,
   'data-cy': string,
   containerClassName: string,
   disabled: bool,
   error: string,
   errorClassName: string,
   id: string,
   maxLength: number,
   name: string,
   onBlur: func,
   onChange: func,
   onFocus: func,
   placeholder: string,
   ref: oneOfType([func, shape({ current: any })]),
   size: oneOf(['lg', 'md', 'sm']),
   textareaClassName: string,
   value: string,
};
export default Textarea;
