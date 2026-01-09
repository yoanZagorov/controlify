import { useRef } from 'react'
import cn from 'classnames'

import { useAutoFocus } from '#hooks'
import { monthsMap } from '#utils/date/maps'

export default function Calendar({
  daysOfMonth,
  startOfMonthDayOfWeek,
  localDate,
  clickHandlers,
  className,
}) {
  const currentDateBtnRef = useRef(null)
  useAutoFocus({ ref: currentDateBtnRef })

  const { handleDayClick, handleMonthDecrement, handleMonthIncrement } =
    clickHandlers

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const daysOfWeekEls = daysOfWeek.map((day, index) => {
    return (
      <div
        key={index}
        className="w-full h-full flex justify-center items-center text-xs text-gray-dark font-semibold"
      >
        {day}
      </div>
    )
  })

  const daysOfMonthEls = daysOfMonth.map((day, i) => (
    <div
      key={i}
      className="w-full h-full flex justify-center items-center"
      style={
        day.value === 1 ? { gridColumnStart: startOfMonthDayOfWeek + 1 } : {}
      } // Initializing the grid-cols from the correct day of week
    >
      <button
        ref={day.isCurrentDate ? currentDateBtnRef : null}
        type="button"
        disabled={day.isAfterToday} // To do: Implement the ability to schedule transactions but for now keep all future ones disabled
        className={cn(
          'size-8 flex justify-center items-center p-1.5 text-sm rounded-full focus-goldenrod',
          day.isToday && !day.isCurrentDate && 'bg-gray-medium', // Keeping a reference to today if it's not currently selected
          day.isAfterToday && 'opacity-50',
          day.isCurrentDate && 'bg-navy text-goldenrod',
        )}
        onClick={() => handleDayClick(day.value)}
      >
        {day.value}
      </button>
    </div>
  ))

  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-gray-light rounded-lg mt-6">
      <div className="flex items-center gap-4 text-gray-dark font-semibold">
        <button
          type="button"
          onClick={handleMonthDecrement}
          className="focus-visible-goldenrod rounded"
        >
          {'<'}
        </button>
        <span>
          {monthsMap[localDate.month]} {localDate.year}
        </span>
        <button
          type="button"
          onClick={handleMonthIncrement}
          className="focus-visible-goldenrod rounded"
        >
          {'>'}
        </button>
      </div>

      <div className="w-full grid grid-cols-7">{daysOfWeekEls}</div>
      <div className="w-full grid grid-cols-7 gap-y-2.5">{daysOfMonthEls}</div>
    </div>
  )
}
