import clsx from 'clsx';
const Spinner = ({ size = 20 }) => (
   <div
      className={clsx('rounded-[50%] relative')}
      style={{ width: size, height: size }}
   >
      <div
         style={{ width: size, height: size }}
         className={clsx(
            'rounded-[50%] border-[2.5px] border-solid border-(--input-loading-spinner-color) left-0 top-0 relative spinner-animation',
         )}
      ></div>
   </div>
);
export default Spinner;
