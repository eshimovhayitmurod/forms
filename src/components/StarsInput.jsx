import { bool, func, number, string } from 'prop-types';
import { memo } from 'react';
import ReactStarsModule from 'react-stars';
const ReactStars = ReactStarsModule.default ?? ReactStarsModule;
const StarsInput = memo(
   ({
      activeBackgroundColor = '#ffd700',
      backgroundColor = '#ADADAD',
      isDisabled = false,
      onChange,
      value = 0,
   }) => (
      <div className='flex h-8 items-center space-x-1'>
         <ReactStars
            color1={backgroundColor}
            color2={activeBackgroundColor}
            count={5}
            edit={!isDisabled}
            half={false}
            onChange={onChange}
            size={24}
            value={value}
         />
      </div>
   ),
);
StarsInput.propTypes = {
   activeBackgroundColor: string,
   backgroundColor: string,
   isDisabled: bool,
   onChange: func,
   value: number,
};
export default StarsInput;
