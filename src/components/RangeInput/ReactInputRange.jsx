import { bool, func, number, object } from 'prop-types';
import Slider from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import styled from 'styled-components';
const StyledElement = styled.div`
   & .input-range {
      height: 24px;
      & .input-range__label--max,
      & .input-range__label--min {
         display: none;
      }
      & .input-range__track--background {
         background-color: #f6f6f6;
         height: 5px;
         transition: none;
         & .input-range__track--active {
            background-color: #3a79f3;
            height: 5px;
            transition: none;
         }
         & .input-range__slider-container {
            transition: none;
            & .input-range__slider {
               background-color: #ffffff;
               border: none;
               box-shadow: #cacaca 0px 2px 8px !important;
               top: -1px;
               &:active {
                  transform: scale(1);
               }
               &:focus {
                  box-shadow: none;
               }
            }
         }
      }
   }
`;
const ReactInputRange = ({
   isDisabled = false,
   max = 100,
   min = 0,
   onChange,
   step = 1,
   value = [0, 100],
}) => (
   <StyledElement>
      <Slider
         disabled={isDisabled}
         formatLabel={value => value}
         maxValue={max}
         minValue={min}
         step={step}
         value={{ min: value[0], max: value[1] }}
         onChange={value => {
            onChange([value.min, value.max]);
         }}
      />
   </StyledElement>
);
ReactInputRange.propTypes = {
   isDisabled: bool,
   maxValue: number,
   minValue: number,
   onChange: func,
   step: number,
   value: object,
};
export default ReactInputRange;
