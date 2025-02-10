import { useCallback, useState } from "react";

import { useProvidedState } from "@/hooks";
import { compareDatesByDay, getNumDaysInMonth, getSpecificDay } from "@/utils/date";

import { SelectedDay } from "./components/SelectedDay";
import { Calendar } from "./components/Calendar";

export default function DateModal({ closeModal, state }) {
  const today = getSpecificDay("today");

  const [date, setDate] = useProvidedState(state, today);

  // Keeping the month and day local, to prevent unnecessary rerenders of the provider
  const [localDate, setLocalDate] = useState({
    month: date.getMonth(),
    year: date.getFullYear()
  })

  const startOfMonth = new Date(localDate.year, localDate.month);
  startOfMonth.setDate(1);
  // The getDay() method is Sunday-based (0 represents Sunday) so need to convert it to Monday-based
  const startOfMonthDayOfWeek = (startOfMonth.getDay() + 6) % 7;

  const numDaysInMonth = getNumDaysInMonth(localDate.month, localDate.year);

  const daysOfMonth = Array.from({ length: numDaysInMonth }, (_, i) => {
    const day = i + 1;

    const currentIterationDate = new Date(localDate.year, localDate.month, day);

    const isCurrentDate = compareDatesByDay(currentIterationDate, date);
    const isToday = compareDatesByDay(currentIterationDate, today);

    return { value: day, isCurrentDate, isToday };
  })

  // Click handlers
  function handleDayClick(dayOfMonth) {
    setDate(new Date(localDate.year, localDate.month, dayOfMonth));
    closeModal();
  }

  const handleMonthDecrement = useCallback(() => {
    setLocalDate(prevDate => ({
      ...prevDate,
      // Ensures wrapping to the prev year if needed
      month: prevDate.month === 0 ? 11 : prevDate.month - 1,
      year: prevDate.month === 0 ? prevDate.year - 1 : prevDate.year
    }));
  }, []);

  const handleMonthIncrement = useCallback(() => {
    setLocalDate(prevDate => ({
      ...prevDate,
      // Ensures wrapping to the next year if needed
      month: prevDate.month === 11 ? 0 : prevDate.month + 1,
      year: prevDate.month === 11 ? prevDate.year + 1 : prevDate.year
    }));
  }, []);

  return (
    <div className="mx-auto max-w-80">
      <SelectedDay date={date} />

      <Calendar
        daysOfMonth={daysOfMonth}
        startOfMonthDayOfWeek={startOfMonthDayOfWeek}
        localDate={localDate}
        clickHandlers={{ handleDayClick, handleMonthDecrement, handleMonthIncrement }}
      />
    </div>
  )
}

