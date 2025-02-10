import cn from "classnames";

import { monthsMap } from "@/utils/date/maps";
import { useRef } from "react";
import { useAutoFocus } from "@/hooks";

export default function Calendar({ daysOfMonth, startOfMonthDayOfWeek, localDate, clickHandlers, className }) {
  const currentDateBtnRef = useRef(null);
  useAutoFocus({ ref: currentDateBtnRef });

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
      0: "col-start-1",
      1: "col-start-2",
      2: "col-start-3",
      3: "col-start-4",
      4: "col-start-5",
      5: "col-start-6",
      6: "col-start-7"
    }

    return (
      <button
        key={i}
        ref={day.isCurrentDate ? currentDateBtnRef : null}
        type="button"
        className={cn(
          "size-8 flex justify-center items-center p-1.5 text-sm rounded-full focus-goldenrod",
          day.value === 1 && colStartMap[startOfMonthDayOfWeek], // initializing the grid-cols correcly
          (day.isToday && !day.isCurrentDate) && "bg-gray-medium",
          day.isCurrentDate && "bg-navy text-goldenrod",
        )}
        onClick={() => handleDayClick(day.value)}
      >
        {day.value}
      </button>
    )
  })

  const { month, year } = localDate;

  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-gray-light rounded-lg mt-6">
      <div className="flex items-center gap-4 text-gray-dark font-semibold">
        <button type="button" onClick={handleMonthDecrement} className="focus-goldenrod rounded">{"<"}</button>
        <span>{monthsMap[month]} {year}</span>
        <button type="button" onClick={handleMonthIncrement} className="focus-goldenrod rounded">{">"}</button>
      </div>

      <div className="w-full grid grid-cols-7">
        {daysOfWeekEls}
      </div>
      <div className="w-full grid grid-cols-7 gap-y-2.5">
        {daysOfMonthEls}
      </div>
    </div>
  )
}
