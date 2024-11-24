import { SvgIcon } from "@/components/SvgIcon";

export default function SlideButton({ disabled, handleClick, iconName }) {
  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      className={disabled ? "opacity-50" : ""}
    >
      <SvgIcon iconName={iconName} className="size-5 fill-gray-dark" />
    </button>
  )
}
