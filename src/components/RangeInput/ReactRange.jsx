import { array, bool, func, number } from 'prop-types';
import { Range, getTrackBackground } from 'react-range';
import styled from 'styled-components';
const StyledTrack = styled.div`
   align-items: center;
   display: flex;
   height: 24px;
   justify-content: center;
   width: 100%;
   & .react-range-track {
      border-radius: 3px;
      height: 5px;
      width: 100%;
   }
`;
const StyledThumb = styled.div`
   background-color: #ffffff;
   border-radius: 50%;
   box-shadow: #cacaca 0px 2px 8px;
   height: 24px;
   outline: none;
   width: 24px;
   & .value {
      align-items: center;
      bottom: 34px;
      display: flex;
      height: 24px;
      justify-content: center;
      left: 0px;
      position: absolute;
      width: 24px;
      &:before {
         background-color: #3a79f3;
         border-radius: 0 0 2px 0;
         bottom: -6px;
         content: '';
         height: 8px;
         position: absolute;
         transform: rotate(45deg);
         width: 8px;
         z-index: -1;
      }
      & div {
         align-items: center;
         background-color: #3a79f3;
         border-radius: 8px;
         color: #ffffff;
         display: flex;
         font-size: 15px;
         font-weight: 500;
         justify-content: center;
         padding: 5px 8px;
      }
   }
`;
const renderThumb = ({ props, value, isDragged }) => (
   <StyledThumb {...props}>
      {isDragged && (
         <div className='value'>
            <div>{value}</div>
         </div>
      )}
   </StyledThumb>
);
const renderTrack = ({ props, children }) => {
   const values = children.map(child => child?.props['aria-valuenow']);
   const colors =
      values.length === 1
         ? ['#3a79f3', '#f6f6f6']
         : [
              '#f6f6f6',
              ...[...Array(values.length - 1)].fill('#3a79f3'),
              '#f6f6f6',
           ];
   const background = getTrackBackground({
      colors,
      max: 100,
      min: 0,
      values,
   });
   return (
      <StyledTrack>
         <div {...props} className='react-range-track' style={{ background }}>
            {children}
         </div>
      </StyledTrack>
   );
};
const ReactRange = ({
   isDisabled = false,
   max = 100,
   min = 0,
   onChange,
   step = 1,
   value = [0, 100],
}) => (
   <Range
      disabled={isDisabled}
      max={max}
      min={min}
      onChange={onChange}
      renderThumb={renderThumb}
      renderTrack={renderTrack}
      step={step}
      values={value}
   />
);
ReactRange.propTypes = {
   isDisabled: bool,
   max: number,
   min: number,
   onChange: func,
   step: number,
   value: array,
};
export default ReactRange;
