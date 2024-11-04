import cn from "classnames";
import { monthsMap } from "@/utils/date/maps";

export default function Calendar({ daysOfMonth, startOfMonthDayOfWeek, localDate, clickHandlers, className = {} }) {
  const { handleDayClick, handleMonthDecrement, handleMonthIncrement } = clickHandlers;

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const daysOfWeekEls = daysOfWeek.map((day, index) => {
    return (
      <div
        key={index}
        className="flex justify-center items-center text-xs text-gray-dark font-semibold"
      >
        {day}
      </div>
    )
  })

  const daysOfMonthEls = daysOfMonth.map((day, i) => {
    const colStartMap = {
      1: "col-start-1",
      2: "col-start-2",
      3: "col-start-3",
      4: "col-start-4",
      5: "col-start-5",
      6: "col-start-6",
      7: "col-start-7"
    }

    const dayClasses = cn(
      "w-8 h-8 flex justify-center items-center p-1.5 text-sm rounded-full",
      day.value === 1 && colStartMap[startOfMonthDayOfWeek],
      day.isCurrentDate && "bg-navy text-goldenrod"
    )

    return (
      <button
        key={i}
        type="button"
        className={dayClasses}
        onClick={() => handleDayClick(day.value)}
      >
        {day.value}
      </button>
    )
  })

  const { month, year } = localDate;

  return (
    <div className="max-w-[300px] flex flex-col items-center gap-6 p-6 bg-gray-light rounded-lg mt-6">
      <div className="flex items-center gap-6 text-gray-dark font-semibold">
        <button type="button" onClick={handleMonthDecrement}>{"<"}</button>
        <span>{monthsMap[month]} {year}</span>
        <button type="button" onClick={handleMonthIncrement}>{">"}</button>
      </div>

      <div className="flex justify-between gap-4">
        {daysOfWeekEls}
      </div>
      <div className="w-full grid grid-cols-7 gap-0.5">
        {daysOfMonthEls}
      </div>
    </div>
  )
}
