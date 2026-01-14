import { useRef } from 'react'
import cn from 'classnames'

import { useAutoFocus } from '#/hooks'
import { monthsMap } from '#/utils/date/maps'

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
        className="flex h-full w-full items-center justify-center text-xs font-semibold text-gray-dark"
      >
        {day}
      </div>
    )
  })

  const daysOfMonthEls = daysOfMonth.map((day, i) => (
    <div
      key={i}
      className="flex h-full w-full items-center justify-center"
      style={
        day.value === 1 ? { gridColumnStart: startOfMonthDayOfWeek + 1 } : {}
      } // Initializing the grid-cols from the correct day of week
    >
      <button
        ref={day.isCurrentDate ? currentDateBtnRef : null}
        type="button"
        disabled={day.isAfterToday} // To do: Implement the ability to schedule transactions but for now keep all future ones disabled
        className={cn(
          'focus-goldenrod flex size-8 items-center justify-center rounded-full p-1.5 text-sm',
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
    <div className="mt-6 flex flex-col items-center gap-6 rounded-lg bg-gray-light p-6">
      <div className="flex items-center gap-4 font-semibold text-gray-dark">
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

      <div className="grid w-full grid-cols-7">{daysOfWeekEls}</div>
      <div className="grid w-full grid-cols-7 gap-y-2.5">{daysOfMonthEls}</div>
    </div>
  )
}
