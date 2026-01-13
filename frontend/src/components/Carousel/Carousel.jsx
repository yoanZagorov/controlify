import cn from 'classnames'
import { useState } from 'react'
import { SlideButton } from './components/SlideButton'

// Used where space is limited to cycle between sections
export default function Carousel({ items, className }) {
  const [activeItemIndex, setActiveItemIndex] = useState(0)

  const isFirst = activeItemIndex === 0
  const isDecrementBtnDisabled = isFirst

  const isLast = activeItemIndex === items.length - 1
  const isIncrementBtnDisabled = isLast

  function handleIncrement() {
    const newActiveItemIndex = activeItemIndex + 1
    setActiveItemIndex(newActiveItemIndex)
  }

  function handleDecrement() {
    const newActiveItemIndex = activeItemIndex - 1
    setActiveItemIndex(newActiveItemIndex)
  }

  const itemsEls = items.map((item, index) => (
    <li
      key={index}
      className={cn(
        'w-full transition-transform',
        index !== activeItemIndex &&
          `absolute ${activeItemIndex > index ? '-translate-x-[100vw]' : 'translate-x-[100vw]'}`,
      )}
    >
      {item}
    </li>
  ))

  const dotEls = Array.from({ length: items.length }, (_, index) => (
    <div
      key={index}
      className={`size-1 rounded-full bg-gray-dark ${index === activeItemIndex ? 'opacity-100' : 'opacity-50'}`}
    ></div>
  ))

  return (
    <div className={cn(className)}>
      <ul className="relative flex">{itemsEls}</ul>
      <div className="mt-4 flex items-center justify-center gap-6">
        <SlideButton
          disabled={isDecrementBtnDisabled}
          handleClick={handleDecrement}
          iconName="angles-left"
        />

        <div className="flex gap-1">{dotEls}</div>

        <SlideButton
          disabled={isIncrementBtnDisabled}
          handleClick={handleIncrement}
          iconName="angles-right"
        />
      </div>
    </div>
  )
}
