import { oneOf, string } from 'prop-types';
import { memo, useMemo } from 'react';
import { errorClass } from '../classNames';
const ErrorMessage = memo(({ error = '', size = 'md' }) => {
   const isError = useMemo(() => !!error, [error]);
   return (
      isError && (
         <h5 className={errorClass({ size })} role='alert'>
            {error}
         </h5>
      )
   );
});
ErrorMessage.propTypes = { error: string, size: oneOf(['lg', 'md', 'sm']) };
export default ErrorMessage;
