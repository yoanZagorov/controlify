import { SvgIcon } from "@/components/SvgIcon";
import cn from "classnames";

export default function SlideButton({ disabled, handleClick, iconName }) {
  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      className={cn(disabled && "opacity-50")}
    >
      <SvgIcon iconName={iconName} className="size-5 fill-gray-dark" />
    </button>
  )
}
