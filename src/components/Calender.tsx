import FullCalendar from '@fullcalendar/react'
import React from 'react'
import dayGridPlugin from '@fullcalendar/daygrid';
import jaLocal from '@fullcalendar/core/locales/ja';
import "../calender.css"
import { EventContentArg } from '@fullcalendar/core';

function Calender() {
  const events = [
  { title: 'Meeting', start: new Date() }
  ]

  const renderEventContent =(eventInfo: EventContentArg) => {
    return (
      <div>
        <div className="money" id="event-income">
          {eventInfo.event.extendedProps.income}
        </div>
        <div className="money" id="event-expense">
          {eventInfo.event.extendedProps.income}
        </div>
        <div className="money" id="event-balance">
          {eventInfo.event.extendedProps.income}
        </div>
      </div>
    )
  }

  return (
    <FullCalendar
      locale={jaLocal}
      plugins={[dayGridPlugin]}
      initialView='dayGridMonth'
      events={events}
      eventContent={renderEventContent}
    />
  )
}

export default Calender