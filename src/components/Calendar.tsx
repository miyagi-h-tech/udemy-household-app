import FullCalendar from '@fullcalendar/react'
import React from 'react'
import dayGridPlugin from '@fullcalendar/daygrid';
import jaLocal from '@fullcalendar/core/locales/ja';
import "../calender.css"
import { EventContentArg } from '@fullcalendar/core';
import { Balance, CalendarContent, Transaction } from '../types';
import { calculateDailyBlances } from '../utils/financeCalculations';
import { formatCurrency } from '../utils/formatting';

interface ClandarProps {
  monthlyTransactions: Transaction[]
}

function Calender({ monthlyTransactions }: ClandarProps) {
  const events = [
    { title: 'Meeting', start: new Date() }
  ]

  // 1.日付ごとの修正を計算する関数
  const dailyBalances = calculateDailyBlances(monthlyTransactions);
  // console.log(dailyBalances);

  // 2.FullCalender用のイベントを生成する関数
  const createCalendarEvents = (dailyBalances: Record<string, Balance>): CalendarContent[] => {
    return Object.keys(dailyBalances).map((date) => {
      const { income, expense, balance } = dailyBalances[date]
      return {
        start: date,
        income: formatCurrency(income),
        expense: formatCurrency(expense),
        balance: formatCurrency(balance),
      }
    })
  }

  const calendarEvents = createCalendarEvents(dailyBalances);
  console.log(calendarEvents);

  const renderEventContent = (eventInfo: EventContentArg) => {
    return (
      <div>
        <div className="money" id="event-income">
          {eventInfo.event.extendedProps.income}
        </div>
        <div className="money" id="event-expense">
          {eventInfo.event.extendedProps.expense}
        </div>
        <div className="money" id="event-balance">
          {eventInfo.event.extendedProps.balance}
        </div>
      </div>
    )
  }

  return (
    <FullCalendar
      locale={jaLocal}
      plugins={[dayGridPlugin]}
      initialView='dayGridMonth'
      events={calendarEvents}
      eventContent={renderEventContent}
    />
  )
}

export default Calender