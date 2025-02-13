import cn from "classnames";
import { useState } from "react";

import { SlideButton } from "./components/SlideButton";

export default function Carousel({ items, className }) {
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  const isFirst = activeItemIndex === 0;
  const isDecrementBtnDisabled = isFirst;

  const isLast = activeItemIndex === items.length - 1;
  const isIncrementBtnDisabled = isLast;

  function handleIncrement() {
    const newActiveItemIndex = activeItemIndex + 1;
    setActiveItemIndex(newActiveItemIndex);
  }

  function handleDecrement() {
    const newActiveItemIndex = activeItemIndex - 1;
    setActiveItemIndex(newActiveItemIndex);
  }

  const classes = {
    carousel: cn("rounded-b-lg", className),
    itemClasses: function (itemIndex) {
      const isActive = itemIndex === activeItemIndex;
      const isBefore = activeItemIndex > itemIndex;

      return cn(
        "w-full transition-transform",
        !isActive && `absolute ${isBefore ? "translate-x-[-100vw]" : "translate-x-[100vw]"}`
      )
    }
  }

  const itemsEls = items.map((item, index) => (
    <li key={index} className={classes.itemClasses(index)}>
      {item}
    </li>
  ))

  const dotEls = Array.from({ length: items.length }, (_, index) => {
    const isActive = index === activeItemIndex;

    return (
      <div
        key={index}
        className={`size-1 rounded-full bg-gray-dark ${isActive ? "opacity-100" : "opacity-50"}`}
      >
      </div>
    )
  })

  return (
    <div>
      <ul className={classes.carousel}>
        <div className="relative flex">
          {itemsEls}
        </div>
      </ul>
      <div className="mt-4 flex justify-center items-center gap-6">
        <SlideButton
          disabled={isDecrementBtnDisabled}
          handleClick={handleDecrement}
          iconName="angles-left"
        />

        <div className="flex gap-1">
          {dotEls}
        </div>

        <SlideButton
          disabled={isIncrementBtnDisabled}
          handleClick={handleIncrement}
          iconName="angles-right"
        />
      </div>
    </div>
  )
}
