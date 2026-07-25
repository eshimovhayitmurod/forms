import moment from 'moment';
import { any, array, bool, func } from 'prop-types';
import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import {
   Calendar as ReactBigCalendar,
   momentLocalizer,
} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-contexify/ReactContexify.css';
import Popup from 'reactjs-popup';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import Toolbar from './Toolbar';
const animation = keyframes`
   0% {
      transform: scale(103%);
      opacity: 0.1;
   }
   100% {
      transform: scale(100%);
      opacity: 1;
   }
`;

moment.locale('uz', {
   months: [
      'Yanvar',
      'Fevral',
      'Mart',
      'Aprel',
      'May',
      'Iyun',
      'Iyul',
      'Avgust',
      'Sentyabr',
      'Oktyabr',
      'Noyabr',
      'Dekabr',
   ],
   monthsShort: [
      'Yan',
      'Fev',
      'Mar',
      'Apr',
      'May',
      'Iyun',
      'Iyul',
      'Avg',
      'Sen',
      'Okt',
      'Noy',
      'Dek',
   ],
   monthsParseExact: true,
   weekdays: [
      'Yakshanba',
      'Dushanba',
      'Seshanba',
      'Chorshanba',
      'Payshanba',
      'Juma',
      'Shanba',
   ],
   weekdaysShort: ['Ya', 'Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh'],
   weekdaysMin: ['Ya', 'Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh'],
   weekdaysParseExact: true,
   longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD.MM.YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'dddd D MMMM YYYY HH:mm',
   },
   calendar: {
      sameDay: '[Aujourd’hui à] LT',
      nextDay: 'Keyingi Kun',
      nextWeek: 'Keyingi Hafta',
      lastDay: '[Hier à] LT',
      lastWeek: 'dddd [dernier à] LT',
      sameElse: 'L',
   },
   relativeTime: {
      future: 'dans %s',
      past: 'il y a %s',
      s: 'quelques secondes',
      m: 'une minute',
      mm: '%d minutes',
      h: 'une heure',
      hh: '%d heures',
      d: 'un jour',
      dd: '%d jours',
      M: 'un mois',
      MM: '%d mois',
      y: 'un an',
      yy: '%d ans',
   },
   dayOfMonthOrdinalParse: /\d{1,2}(-)/,
   ordinal: number => number + '-',
   meridiemParse: /PM|AM/,
   isPM: input => input.charAt(0) === 'M',
   meridiem: hours => (hours < 12 ? 'AM' : 'PM'),
   week: {
      dow: 1,
      doy: 4,
   },
});
const localizer = momentLocalizer(moment);
const options = {
   endAccessor: 'end',
   localizer,
   startAccessor: 'start',
   tooltipAccessor: null,
   views: ['month', 'week', 'work_week', 'day', 'agenda'],
   style: {
      width: '100%',
   },
   dayPropGetter: () => ({
      style: {
         cursor: 'pointer',
      },
   }),
   messages: {
      agenda: 'Kun tartibi',
      allDay: 'Kun davomida',
      date: 'Sana',
      day: 'Kun',
      event: 'Hodisa',
      month: 'Oy',
      next: 'Keyingi',
      noEventsInRange: 'Hodisalar mavjud emas',
      previous: 'Orqaga',
      showMore: total => `Yana ${total}ta`,
      time: 'Vaqt',
      today: 'Bugun',
      tomorrow: 'Ertaga',
      week: 'Hafta',
      work_week: 'Ish haftasi',
      yesterday: 'Kecha',
   },
};
const Styles = createGlobalStyle`
   & .rbc-overlay {
      border-radius: 12px !important;
      border: none !important;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
      max-width: 250px;
      padding: 8px !important;
      & .rbc-overlay-header {
         border-bottom: 1px solid #e2e4ea;
         padding: 8px 10px 5px 10px !important;
      }
      & > * + * {
         margin: 7px 0 0 0;
      }
      & .rbc-event-content {
         overflow: hidden;
         text-overflow: ellipsis;
         white-space: nowrap;
      }
   }
`;
const StyledCalendar = styled(ReactBigCalendar)`
   border-radius: 14px;
   height: 100%;
   overflow: hidden;
   position: relative;
   width: 100%;
   padding: 7px;
   box-shadow: 0 1px 15px 0 rgba(13, 46, 105, 0.05),
      0 1px 15px 0 rgba(13, 46, 105, 0.05);
   & .rbc-today {
      background-color: rgba(82, 85, 241, 0.1);
   }
   & .rbc-month-view {
      border: 1px solid #e2e4ea;
      border-radius: 12px;
      overflow: hidden;
      & .rbc-month-header {
         & .rbc-header {
            border-bottom: 1px solid #e2e4ea;
            font-size: 16px;
            padding: 8px 0;
         }
         & .rbc-header + .rbc-header {
            border-left: 1px solid #e2e4ea;
         }
      }
      & .rbc-month-row + .rbc-month-row {
         border-top: 1px solid #e2e4ea;
      }
      & .rbc-month-row {
         & .rbc-row-content {
            & .rbc-row {
               & .rbc-date-cell {
                  padding: 0;
               }
               & .rbc-row-segment {
                  & .rbc-show-more {
                     background-color: transparent;
                     border-radius: 8px;
                     color: #0071f2;
                     padding: 2px 4px;
                  }
               }
            }
         }
         & .rbc-row-bg {
            & .rbc-day-bg + .rbc-day-bg {
               border-left: 1px solid #e2e4ea;
            }
         }
      }
   }
   & .rbc-time-view {
      border: 1px solid #e2e4ea;
      border-radius: 12px;
      overflow: hidden;
      & .rbc-time-header {
         border-left: none;
         & .rbc-time-header-content {
            border-left: 1px solid #e2e4ea;
            font-size: 16px;
            vertical-align: center;
            & .rbc-header {
               align-items: center;
               border-bottom: 1px solid #e2e4ea;
               display: flex;
               justify-content: center;
               padding: 0;
               &:last-child {
                  padding: 0 6px 0 0;
               }
               & .rbc-button-link {
                  font-size: 15px;
                  padding: 13px 0;
                  width: 100%;
               }
            }
            & .rbc-header + .rbc-header {
               border-left: 1px solid #e2e4ea;
            }
            & .rbc-row-bg {
               padding: 0 6px 0 0;
               & .rbc-day-bg + .rbc-day-bg {
                  border-left: 1px solid #e2e4ea;
               }
            }
         }
      }
      & .rbc-time-content {
         border-top: 1px solid #e2e4ea;
         margin: 0 0 -1px 0;
         &::-webkit-scrollbar {
            width: 6px;
         }
         &::-webkit-scrollbar-track {
            background-color: transparent;
         }
         &::-webkit-scrollbar-thumb {
            background-color: #0071f2;
            border-radius: 3px;
         }
         & .rbc-day-slot {
            & .rbc-timeslot-group {
               border-bottom: 1px solid #e2e4ea;
               & .rbc-time-slot {
                  border-top: none;
               }
            }
            & .rbc-events-container {
               border-left: 1px solid #e2e4ea;
            }
            & .rbc-current-time-indicator {
               background-color: #0071f2;
            }
         }
         & .rbc-time-gutter {
            & .rbc-timeslot-group {
               align-items: center;
               border-bottom: 1px solid #e2e4ea;
               display: flex;
               flex: initial;
               font-size: 15px;
               justify-content: center;
               padding: 2px 6px;
               & .rbc-time-slot {
                  align-items: center;
                  display: flex;
                  height: 100%;
                  justify-content: center;
                  width: 100%;
                  &:nth-child(2) {
                     display: none;
                  }
               }
            }
         }
      }
   }
   & .rbc-agenda-view {
      border: 1px solid #e2e4ea;
      border-radius: 12px;
      overflow: hidden;
      & .rbc-agenda-empty {
         align-items: center;
         border-top: 1px solid #e2e4ea;
         display: flex;
         font-size: 18px;
         height: 100%;
         justify-content: center;
         width: 100%;
      }
      & .rbc-agenda-content {
         border-top: 1px solid #e2e4ea;
         overflow-y: auto;
         &::-webkit-scrollbar {
            width: 6px;
         }
         &::-webkit-scrollbar-track {
            background-color: transparent;
         }
         &::-webkit-scrollbar-thumb {
            background-color: #0071f2;
            border-radius: 3px;
         }
      }
      & .rbc-agenda-table {
         border: none;
         & thead {
            & th {
               border-bottom: none;
               padding: 8px 12px;
            }
            & th + th {
               border-left: 1px solid #e2e4ea;
            }
         }
         & tbody {
            border-bottom: 1px solid #e2e4ea;
            & .rbc-agenda-date-cell,
            & .rbc-agenda-time-cell,
            & .rbc-agenda-event-cell {
               border-right: 1px solid #e2e4ea;
               padding: 8px 12px;
            }
            & .rbc-agenda-event-cell {
               border-right: none;
            }
         }
      }
      & .rbc-header-overflowing {
         border-top: 1px solid #e2e4ea;
      }
   }
`;
const StyledEventWrapper = styled.div`
   &[data-status='success'] {
      & .rbc-event {
         background-color: #64bc26;
      }
   }
   &[data-status='warning'] {
      & .rbc-event {
         background-color: #fad202;
      }
   }
   &[data-status='info'] {
      & .rbc-event {
         background-color: #0071f2;
      }
   }
   &[data-status='error'] {
      & .rbc-event {
         background-color: #ea1601;
      }
   }
   & .rbc-event {
      background-color: #0071f2;
      border-radius: 8px;
      border: none;
      padding: 4px 8px;
      display: flex;
      flex-direction: column;
      &:focus {
         outline: none;
      }
      & .rbc-event-content {
         font-size: 15px;
      }
      & .rbc-event-label {
         padding: 0 0 3px 0;
      }
   }
`;
const StyledDay = styled.button`
   background-color: rgba(82, 85, 241, 0.1);
   border-radius: 12px;
   border: none;
   cursor: pointer;
   font-size: 15px;
   margin: 3px 3px 0 0;
   min-width: 24px;
   outline: none;
   padding: 4px 7px;
`;
const StyledEventView = styled.div`
   animation: ${animation} 0.3s cubic-bezier(0.38, 0.1, 0.36, 0.9);
   background-color: white;
   box-shadow: 0 1px 15px 0 rgba(13, 46, 105, 0.05),
      0 1px 15px 0 rgba(13, 46, 105, 0.05);
   border-radius: 16px;
   height: 300px;
   padding: 16px;
`;
const EventWrapper = ({ children, event }) => (
   <Popup
      trigger={
         <StyledEventWrapper data-status={event?.status}>
            {children}
         </StyledEventWrapper>
      }
      arrow={false}
      lockScroll={true}
      position='center center'
   >
      <StyledEventView>Popup content here !!</StyledEventView>
   </Popup>
);
const Day = ({ label }) => <StyledDay>{label}</StyledDay>;
const Calendar = ({
   CreateEventComponent,
   EventComponent,
   date = new Date(),
   events = [],
   loading = false,
   onNavigate,
}) => {
   const ref = useRef(null);
   const [view, setView] = useState('month');
   const memoizedDate = useMemo(() => date, [date]);
   const [event, setEvent] = useState(null);
   const memoizedOptions = useMemo(
      () => ({
         components: {
            toolbar: Toolbar,
            month: {
               dateHeader: Day,
            },
            eventWrapper: EventWrapper,
         },
         formats: {
            dateFormat: (date, culture, localizer) => {
               return localizer.format(date, 'D', culture);
            },
            dayFormat: (date, culture, localizer) => {
               return localizer.format(date, 'ddd', culture);
            },
            dayHeaderFormat: (date, culture, localizer) => {
               return localizer.format(date, 'dddd DoMMMM YYYY', culture);
            },
            dayRangeHeaderFormat: ({ start }, culture, localizer) => {
               const week = localizer.format(start, 'w', culture);
               const year = localizer.format(start, 'YYYY', culture);
               return week + '-hafta ' + year;
            },
            agendaHeaderFormat: ({ start }, culture, localizer) => {
               return localizer.format(start, 'MMMM YYYY', culture);
            },
            agendaDateFormat: (date, culture, localizer) => {
               return localizer.format(date, 'DoMMMM', culture);
            },
         },
      }),
      []
   );
   const onSelectEvent = (event, nativeEvent) => {
      setEvent({ event, nativeEvent });
   };
   const onSelectSlot = (e, e1) => {
      console.log(e, e1);
   };
   useEffect(() => {
      console.log(ref);
      const listener = e => {
         if (e.target.tagName === 'BODY') {
            switch (e.code) {
               case 'KeyM':
                  setView('month');
                  break;
               case 'KeyW':
                  setView('week');
                  break;
               case 'KeyD':
                  setView('day');
                  break;
               case 'KeyA':
                  setView('agenda');
                  break;
               default:
                  break;
            }
         }
      };
      document.addEventListener('keydown', listener);
      return () => {
         document.removeEventListener('keydown', listener);
      };
   }, []);
   return (
      <Fragment>
         <StyledCalendar
            date={memoizedDate}
            events={events}
            onNavigate={onNavigate}
            onSelectEvent={onSelectEvent}
            onSelectSlot={onSelectSlot}
            onView={setView}
            ref={ref}
            selectable
            view={view}
            {...memoizedOptions}
            {...options}
         />
         <Styles />
      </Fragment>
   );
};
Calendar.propTypes = {
   CreateEventComponent: func,
   EventComponent: func,
   date: any,
   events: array,
   loading: bool,
   onNavigate: func,
};
export default Calendar;
