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
import { memo, useId, useRef } from 'react';
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
      ref: innerRef,
      size = 'md',
      value = '',
   }) => {
      const errorId = useId();
      const ref = useRef(null);
      const currentRef = innerRef ? innerRef : ref;
      const classNameOptions = {
         error: !!error,
         size,
      };
      return (
         <div className={containerClass(classNameOptions)}>
            <div className={textareaContainerClass(classNameOptions)}>
               <textarea
                  aria-describedby={error ? errorId : undefined}
                  aria-invalid={!!error}
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
                  ref={currentRef}
                  value={value}
               />
            </div>
            <ErrorMessage size={size} id={errorId} error={error} />
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
