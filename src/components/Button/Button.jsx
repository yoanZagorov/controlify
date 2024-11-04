import cn from "classnames";

export default function Button({ type = "button", size = "m", variant = "primary", className = "", disabled, children, ...props }) {
  const btnType = type === "submit" ? "submit" : "button";

  const btn = "transition-all shadow focus:outline-none focus:ring";
  const btnDisabled = "opacity-75 cursor-not-allowed";

  const btnS = "py-1 px-2 text-sm rounded-md"
  const btnM = "py-2 px-4 text-base rounded-lg";
  const btnL = "py-3 px-6 text-lg rounded-lg";
  const btnXL = "py-4 px-8 text-xl rounded-lg";

  const btnPrimary = `font-bold uppercase text-goldenrod bg-navy focus:ring-goldenrod ${!disabled && "hover:bg-navy-dark active:bg-navy-dark"}`;
  const btnSecondary = "font-semibold text-gray-dark border border-gray-dark bg-gray-medium focus:border-none focus:ring-gray-dark";

  const btnClasses = cn(
    btn,
    disabled && btnDisabled,
    size === "s" ? btnS
      : size === "l" ? btnL
        : size === "xl" ? btnXL
          : btnM,
    variant === "secondary" ? btnSecondary
      : btnPrimary,
    className
  )

  return (
    <button
      type={btnType}
      disabled={disabled}
      className={btnClasses}
      {...props}
    >
      {children}
    </button>
  )
}