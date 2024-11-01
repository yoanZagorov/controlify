import { useState } from "react";
import { useModalState } from "@/utils/hooks";
import { formatDateForCalendar, getNumDaysInMonth, getSpecificDay } from "@/utils/date";

import { SelectedDay } from "./components/SelectedDay";
import { Calendar } from "./components/Calendar";

export default function DateModal({ closeModal, state }) {
  const today = getSpecificDay("today");

  const [date, setDate] = useModalState(today, state);
  const [localDate, setLocalDate] = useState({ // Keeping the month and day local, to prevent unnecessary rerenders of the provider
    month: date.getMonth(),
    year: date.getFullYear()
  })

  const startOfMonth = new Date(localDate.year, localDate.month);
  startOfMonth.setDate(1);
  const startOfMonthDayOfWeek = startOfMonth.getDay();

  const numDaysInMonth = getNumDaysInMonth(localDate.month, localDate.year);

  let daysOfMonth = [];

  for (let i = 1; i <= numDaysInMonth; i++) {
    const day = i;

    const currentIterationDate = new Date(date);
    currentIterationDate.setFullYear(localDate.year);
    currentIterationDate.setMonth(localDate.month);
    currentIterationDate.setDate(day);

    const dateTime = date.getTime();
    const currentIterationDateTime = currentIterationDate.getTime();

    daysOfMonth.push({
      value: day,
      isCurrentDate: dateTime === currentIterationDateTime
    })
  }

  // Click handlers
  function handleDayClick(dayOfMonth) {
    closeModal();
    setDate(new Date(localDate.year, localDate.month, dayOfMonth))
  }

  function handleMonthDecrement() {
    setLocalDate(prevDate => ({
      ...prevDate,
      month: prevDate.month === 0 ? 11 : prevDate.month - 1,
      year: prevDate.month === 0 ? prevDate.year - 1 : prevDate.year
    }));
  }

  function handleMonthIncrement() {
    setLocalDate(prevDate => ({
      ...prevDate,
      month: prevDate.month === 11 ? 0 : prevDate.month + 1,
      year: prevDate.month === 11 ? prevDate.year + 1 : prevDate.year
    }));
  }

  const clickHandlers = {
    handleDayClick,
    handleMonthDecrement,
    handleMonthIncrement
  }

  const formattedDate = formatDateForCalendar(date);

  return (
    <div>
      <SelectedDay
        date={formattedDate}
        className={{ component: "mt-6" }}
      />

      <Calendar
        daysOfMonth={daysOfMonth}
        startOfMonthDayOfWeek={startOfMonthDayOfWeek}
        localDate={localDate}
        clickHandlers={clickHandlers}
      />
    </div>
  )
}

