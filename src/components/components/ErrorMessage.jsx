import { oneOf, string } from 'prop-types';
import { memo, useMemo } from 'react';
import { errorClass } from '../classNames';
const ErrorMessage = memo(({ error = '', size = 'md', id }) => {
   const isError = useMemo(() => !!error, [error]);
   return (
      isError && (
         <h5 id={id} className={errorClass({ size })} role='alert'>
            {error}
         </h5>
      )
   );
});
ErrorMessage.propTypes = {
   error: string,
   id: string,
   size: oneOf(['lg', 'md', 'sm']),
};
export default ErrorMessage;
