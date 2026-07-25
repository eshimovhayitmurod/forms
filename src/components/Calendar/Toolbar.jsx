import { func, string } from 'prop-types';
import ReactBigCalendarToolbar from 'react-big-calendar/lib/Toolbar';
import Select, { components } from 'react-select';
import styled, { keyframes } from 'styled-components';
const animation = keyframes`
	0% {
		opacity: 0.1;
		transform: scale(0.6);
	}
	100% {
		opacity: 1;
		transform: scale(1);
	}
`;
export const StyledMenu = styled.div`
   & .react-select-menu {
      animation: ${animation} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      background-color: #ffffff;
      border-radius: 12px;
      border: none;
      box-shadow: 0 1px 20px 0 rgba(13, 46, 105, 0.07),
         0 1px 20px 0 rgba(13, 46, 105, 0.07);
      margin: 0;
      min-width: 100%;
      overflow: hidden;
      padding: 0;
      right: 0;
      transform-origin: top;
      width: initial;
   }
`;
export const StyledToolBar = styled.div`
   align-items: center;
   display: flex;
   justify-content: space-between;
   padding: 0 0 7px 0;
   position: relative;
   z-index: 99;
   & .navigation {
      align-items: center;
      display: flex;
      & button {
         align-items: center;
         background-color: transparent;
         border-radius: 12px;
         border: 1px solid #e2e4ea;
         cursor: pointer;
         display: flex;
         font-size: 16px;
         font-weight: 500;
         height: 40px;
         justify-content: center;
         &:hover {
            background-color: #0071f2;
            border: 1px solid #0071f2;
            color: #ffffff;
            & svg {
               fill: #ffffff;
            }
         }
      }
      & .icon-button {
         margin: 0;
         padding: 0;
         width: 38px;
      }
      & .today-button {
         margin: 0 7px;
         padding: 0 20px;
      }
   }
   & .label {
      font-size: 17px;
      font-weight: 500;
      margin: 0 10px;
   }
`;
const Menu = props => (
   <StyledMenu>
      <components.Menu {...props} className='react-select-menu'>
         {props?.children}
      </components.Menu>
   </StyledMenu>
);
const selectConfig = {
   components: { IndicatorSeparator: () => null, Menu },
   isClearable: false,
   isMulti: false,
   isSearchable: false,
   maxMenuHeight: 210,
   styles: {
      control: styles => ({
         ...styles,
         backgroundColor: '#ffffff',
         border: '1px solid #e2e4ea',
         borderRadius: 12,
         boxShadow: 'none',
         color: 'rgb(37, 42, 59)',
         cursor: 'pointer',
         height: 40,
         minHeight: 40,
         minWidth: 'initial',
         outline: 'none',
         padding: 0,
         width: 'initial',
         ':hover': {
            border: '1px solid #e2e4ea',
         },
      }),
      valueContainer: styles => ({
         ...styles,
         alignItems: 'center',
         display: 'flex',
         height: 38,
         justifyContent: 'center',
         padding: '0 4px 0 16px',
      }),
      singleValue: (styles, { data }) => ({
         ...styles,
         color: data?.isDisabled ? '#696f85' : '#252a3b',
         fontSize: 16,
         fontWeight: 500,
         margin: 0,
      }),
      menuList: styles => ({
         ...styles,
         padding: 5,
         '::-webkit-scrollbar': {
            padding: '0 5px 0 0',
            width: 6,
         },
         '::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
         },
         '::-webkit-scrollbar-thumb': {
            backgroundColor: '#0071f2',
            borderRadius: 3,
         },
      }),
      option: (styles, { isSelected, isFocused }) => ({
         ...styles,
         backgroundColor: isSelected
            ? '#0071f2'
            : isFocused
            ? 'rgba(82, 85, 241, 0.1)'
            : '#ffffff',
         borderRadius: 10,
         color: isSelected ? '#ffffff' : isFocused ? '#252a3b' : '#252a3b',
         cursor: 'pointer',
         fontSize: 16,
         fontWeight: 500,
         height: 40,
         overflow: 'hidden',
         padding: '11px 16px',
         textOverflow: 'ellipsis',
         whiteSpace: 'nowrap',
         width: '100%',
         ':hover': {
            backgroundColor: isSelected ? '#0071f2' : 'rgba(82, 85, 241, 0.1)',
         },
      }),
      indicatorsContainer: styles => ({ ...styles, padding: '0 8px' }),
      dropdownIndicator: (styles, { selectProps }) => ({
         ...styles,
         alignItems: 'center',
         backgroundColor: '#0071f2',
         borderRadius: 11,
         color: '#ffffff',
         display: 'flex',
         height: 22,
         justifyContent: 'center',
         margin: 0,
         padding: 0,
         transform: `rotate(${selectProps?.menuIsOpen ? '180deg' : 0})`,
         transformOrigin: 'center',
         transition: '0.4s transform',
         width: 22,
         svg: {
            width: 16,
         },
         ':hover': {
            color: '#ffffff',
         },
      }),
   },
};
class ToolBar extends ReactBigCalendarToolbar {
   render() {
      const { navigate } = this;
      const { view, label, onView } = this.props;
      const options = [
         {
            value: 'month',
            label: 'Oy',
         },
         {
            value: 'week',
            label: 'Hafta',
         },
         {
            value: 'work_week',
            label: 'Ish haftasi',
         },
         {
            value: 'day',
            label: 'Kun',
         },
         {
            value: 'agenda',
            label: 'Kun tartibi',
         },
      ];
      const value = options.find(option => option?.value === view);
      return (
         <StyledToolBar>
            <div className='navigation'>
               <button
                  className='icon-button'
                  onClick={() => {
                     navigate('PREV');
                  }}
                  type='button'
               >
                  <svg
                     height='24'
                     style={{ margin: '0 2px 0 0' }}
                     viewBox='0 0 24 24'
                     width='24'
                  >
                     <path d='m8.5 12.8 5.7 5.6c.4.4 1 .4 1.4 0 .4-.4.4-1 0-1.4l-4.9-5 4.9-5c.4-.4.4-1 0-1.4-.2-.2-.4-.3-.7-.3-.3 0-.5.1-.7.3l-5.7 5.6c-.4.5-.4 1.1 0 1.6 0-.1 0-.1 0 0z'></path>
                  </svg>
               </button>
               <button
                  className='today-button'
                  onClick={() => {
                     navigate('TODAY');
                  }}
                  type='button'
               >
                  Bugun
               </button>
               <button
                  className='icon-button'
                  onClick={() => {
                     navigate('NEXT');
                  }}
                  type='button'
               >
                  <svg
                     height='24'
                     style={{ margin: '0 0 0 2px' }}
                     viewBox='0 0 24 24'
                     width='24'
                  >
                     <path d='M15.54,11.29,9.88,5.64a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l4.95,5L8.46,17a1,1,0,0,0,0,1.41,1,1,0,0,0,.71.3,1,1,0,0,0,.71-.3l5.66-5.65A1,1,0,0,0,15.54,11.29Z'></path>
                  </svg>
               </button>
            </div>
            <div className='label'>{label}</div>
            <div className='view'>
               <Select
                  {...selectConfig}
                  onChange={e => onView(e?.value)}
                  options={options}
                  value={value}
               />
            </div>
         </StyledToolBar>
      );
   }
}
ToolBar.defaultProps = {
   label: '',
   view: 'month',
};
ToolBar.propTypes = {
   label: string,
   onView: func,
   view: string,
};
export default ToolBar;
