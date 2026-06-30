import { any, bool, func, number, string } from 'prop-types';
import { memo } from 'react';
import ReactOtpInput from 'react-otp-input';
import { inputErrorClass, otpInputClass } from './classNames';
const OTPInput = memo(
   ({
      autoFocus = true,
      error,
      isDisabled = false,
      length = 5,
      onChange,
      onFocus,
      placeholder = '',
      size = 'md',
      value = '',
   }) => {
      const isError = !!error;
      const classNameOptions = { size, error, disabled: isDisabled };
      return (
         <div>
            <ReactOtpInput
               containerStyle='flex gap-2'
               numInputs={length}
               onChange={onChange}
               placeholder={placeholder}
               shouldAutoFocus={autoFocus}
               value={value}
               renderInput={props => (
                  <input
                     {...props}
                     className={otpInputClass(classNameOptions)}
                     disabled={isDisabled}
                     onFocus={onFocus}
                  />
               )}
            />
            {isError && (
               <h5 className={inputErrorClass(classNameOptions)}>{error}</h5>
            )}
         </div>
      );
   },
);
OTPInput.propTypes = {
   autoFocus: bool,
   isDisabled: bool,
   error: any,
   length: number,
   onChange: func,
   onFocus: func,
   placeholder: string,
   value: string,
};
export default OTPInput;
