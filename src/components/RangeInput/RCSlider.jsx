import { array, bool, func, number } from 'prop-types';
import RangeSlider from 'rc-slider';
import styled from 'styled-components';
const StyledElement = styled.div`
   align-items: center;
   display: flex;
   height: 24px;
   justify-content: center;
   width: 100%;
   & .rc-slider {
      height: 5px;
      padding: 0;
      position: relative;
      width: 100%;
      & .rc-slider-rail {
         background-color: #f6f6f6;
         border-radius: 3px;
         cursor: pointer;
         height: 5px;
      }
      & .rc-slider-track {
         background-color: #3a79f3;
         cursor: pointer;
         height: 5px;
         position: absolute;
         top: 0;
      }
      & .rc-slider-step {
         height: 5px;
      }
      & .rc-slider-handle {
         position: absolute;
         top: 0;
      }
   }
`;
const StyledHandle = styled.div`
   background-color: #ffffff;
   border-radius: 50%;
   border: none !important;
   box-shadow: #cacaca 0px 2px 8px !important;
   cursor: grab;
   height: 24px;
   margin-top: -9px;
   opacity: 1;
   outline: none;
   width: 24px;
   &[data-dragging='true'] {
      cursor: grabbing;
   }
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
         opacity: 1;
         padding: 5px 8px;
      }
   }
`;
const RCSlider = ({
   isDisabled = false,
   max = 100,
   min = 0,
   onChange,
   step = 1,
   value = [0, 100],
}) => (
   <StyledElement>
      <RangeSlider
         allowCross={false}
         disabled={isDisabled}
         onChange={onChange}
         pushable={true}
         range={true}
         step={step}
         min={min}
         max={max}
         value={value}
         handleRender={({ props }, { value, dragging }) => (
            <StyledHandle {...props} data-dragging={dragging}>
               {dragging && (
                  <div className='value'>
                     <div>{value}</div>
                  </div>
               )}
            </StyledHandle>
         )}
      />
   </StyledElement>
);
RCSlider.propTypes = {
   isDisabled: bool,
   onChange: func,
   range: bool,
   step: number,
   value: array,
};
export default RCSlider;
