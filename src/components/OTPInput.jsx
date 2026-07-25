import { bool, func, number, string } from 'prop-types';
import { memo } from 'react';
import ReactOtpInput from 'react-otp-input';
import { otpInputClass } from './classNames';
import ErrorMessage from './components/ErrorMessage';
const OTPInput = memo(
   ({
      autoFocus = false,
      disabled = false,
      error = '',
      length = 5,
      onChange,
      onFocus,
      placeholder = '',
      size = 'md',
      value = '',
   }) => {
      const classNameOptions = { size, error: !!error, disabled: disabled };
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
                     disabled={disabled}
                     onFocus={onFocus}
                  />
               )}
            />
            <ErrorMessage size={size} error={error} />
         </div>
      );
   },
);
OTPInput.propTypes = {
   autoFocus: bool,
   disabled: bool,
   error: string,
   length: number,
   onChange: func,
   onFocus: func,
   placeholder: string,
   value: string,
};
export default OTPInput;
