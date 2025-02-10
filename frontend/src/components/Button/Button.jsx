import cn from "classnames";

export default function Button({ size = "m", variant = "solid", colorPalette = "primary", className, children, ...props }) {
  const btnConfig = {
    type: "button",
    disabled: false,
    ...props,
  }

  const btnBase = "transition-[box-shadow,opacity] shadow focus:outline-none focus:ring";
  const btnDisabled = "opacity-75 cursor-not-allowed";

  const sizes = {
    s: "py-1 px-2 text-sm rounded-md focus:ring",
    m: "py-2 px-4 text-base rounded-lg focus:ring-2",
    l: "py-3 px-6 text-lg rounded-lg focus:ring-4",
    xl: "py-4 px-8 text-xl rounded-lg focus:ring-4"
  }

  const btnSecondary = "font-semibold text-gray-dark border border-gray-dark focus:border-opacity-0 focus:ring-gray-dark";
  const colorPalettes = {
    primary: cn(
      "font-bold uppercase text-goldenrod bg-navy focus:ring-goldenrod",
      !btnConfig.disabled && "hover:bg-navy-dark active:bg-navy-dark"
    ),
    secondaryLight: `${btnSecondary} bg-gray-light`,
    secondaryDark: `${btnSecondary} bg-gray-medium`,
    danger: cn(
      "font-bold uppercase bg-navy text-red-light focus:ring-goldenrod",
      // !disabled && "hover:bg-navy-dark active:bg-navy-dark"
    ),
    dangerSecondary: "font-semibold bg-red-dark text-gray-light focus:ring-goldenrod"
  }

  const btnClasses = cn(
    btnBase,
    btnConfig.disabled && btnDisabled,
    variant === "solid" ? "shadow" : "border",
    sizes[size] || sizes.m,
    colorPalettes[colorPalette] || colorPalettes.primary,
    className
  )


  return (
    <button {...btnConfig} className={btnClasses}>
      {children}
    </button>
  )
}