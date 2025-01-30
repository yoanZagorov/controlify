import cn from "classnames";
import { useState } from "react"

import { SlideButton } from "./components/SlideButton";

export default function CopyCarousel({ items, className }) {
  const [activeItem, setActiveItem] = useState(items[0].name);

  const activeItemIndex = items.findIndex(item => item.name === activeItem);

  const isFirst = activeItemIndex === 0;
  const isDecrementBtnDisabled = isFirst;

  const isLast = activeItemIndex === items.length - 1;
  const isIncrementBtnDisabled = isLast;

  function handleIncrement() {
    const newActiveItemIndex = activeItemIndex + 1;
    setActiveItem(items[newActiveItemIndex].name);
  }

  function handleDecrement() {
    const newActiveItemIndex = activeItemIndex - 1;
    setActiveItem(items[newActiveItemIndex].name);
  }

  const classes = {
    carousel: cn(
      "rounded-b-lg",
      className
    ),
    itemClasses: function (itemName) {
      const isActive = itemName === activeItem;
      const itemIndex = items.findIndex(item => item.name === itemName);
      const isBefore = activeItemIndex > itemIndex;

      return cn(
        "w-full transition-transform",
        isActive ? "" : `absolute ${isBefore ? "translate-x-[-100vw]" : "translate-x-[100vw]"}`
      )
    }
  }

  const itemEls = items.map((item, index) => (
    <li key={index} className={classes.itemClasses(item.name)}>
      {item.component}
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
          {itemEls}
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
