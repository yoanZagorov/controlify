import cn from "classnames";

export default function Button({ size = "m", variant = "primary", className = "", disabled, children, ...props }) {
  const btn = "transition-all shadow focus:outline-none";

  const btnXS = "py-1 px-2 ll:py-2 text-sm ls:text-base rounded-md focus:ring"
  const btnS = "py-2 px-4 ll:py-3 text-base ls:text-lg rounded-lg focus:ring-2";
  const btnM = "py-3 px-6 ll:py-4 text-lg ls:text-xl rounded-lg focus:ring-4";
  const btnL = "py-4 px-8 ll:py-5 text-xl ls:text-2xl rounded-lg focus:ring-4";

  const btnPrimary = `font-bold uppercase text-goldenrod bg-navy focus:ring-goldenrod ${!disabled && "hover:bg-navy-dark active:bg-navy-dark"}`;
  const btnSecondary = "font-semibold text-gray-dark border border-gray-dark bg-gray-medium focus:ring-gray-dark";

  const btnClasses = cn(
    btn,
    disabled && "opacity-75 cursor-not-allowed",
    size === "xs" ? btnXS
      : size === "s" ? btnS
        : size === "l" ? btnL
          : btnM,
    variant === "primary" ? btnPrimary : btnSecondary,
    className
  )

  return (
    <button
      className={btnClasses}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}