import { useState } from 'react';
import styled from 'styled-components';
import Calendar from './index';
const StyledElement = styled.div`
   align-items: center;
   display: flex;
   flex-direction: column;
   justify-content: center;
   width: 100%;
   & .content {
      height: 600px;
      max-height: 100%;
      max-width: 100%;
      width: 900px;
   }
`;
const CalendarApp = () => {
   const currentDate = new Date().getTime();
   const [date, setDate] = useState(new Date(currentDate));
   const hour = 1000 * 60 * 60;
   const events = [
      {
         title: 'Meeting',
         start: new Date(currentDate + hour * 3),
         end: new Date(currentDate + hour * 5),
         allDay: false,
         status: 'warning',
      },
      {
         title: 'Meeting',
         start: new Date(currentDate + hour * 24),
         end: new Date(currentDate + hour * 26),
         allDay: false,
         status: 'success',
      },
      {
         title: 'Meeting',
         start: new Date(currentDate - hour * 27),
         end: new Date(currentDate - hour * 24),
         allDay: false,
         status: 'error',
      },
      {
         title: 'Meeting',
         start: new Date(currentDate - hour * 27),
         end: new Date(currentDate - hour * 24),
         allDay: false,
         status: 'error',
      },
      {
         title: 'Meeting',
         start: new Date(currentDate - hour * 27),
         end: new Date(currentDate - hour * 24),
         allDay: false,
         status: 'error',
      },
      {
         title: 'Meeting',
         start: new Date(currentDate - hour * 27),
         end: new Date(currentDate - hour * 24),
         allDay: false,
         status: 'error',
      },
   ];
   return (
      <StyledElement>
         <h2 style={{ textAlign: 'center', margin: '20px 0' }}>Calendar</h2>
         <div className='content'>
            <Calendar
               date={date}
               onNavigate={setDate}
               events={events}
               CreateEventComponent={event => {
                  console.log(event);
                  return (
                     <div>
                        <p>{event.title}</p>
                     </div>
                  );
               }}
               EventComponent={event => {
                  console.log(event);
                  return (
                     <div>
                        <p>{event.title}</p>
                     </div>
                  );
               }}
            />
         </div>
      </StyledElement>
   );
};
export default CalendarApp;
