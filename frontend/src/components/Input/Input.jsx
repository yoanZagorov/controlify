import cn from "classnames";

// To do: change the inputRef to ref when update to React 19
export default function Input({ inputRef = null, size = "m", variant = "solid", colorPalette = "primaryDark", className, ...props }) {
  const inputBase = "placeholder-opacity-50 transition-[box-shadow] focus:border-opacity-0 focus:outline-none focus:ring";

  const sizes = {
    m: "py-1.5 px-2 text-base rounded-md",
    l: "py-2 px-3 text-lg rounded-lg"
  }

  const variants = {
    solid: "border shadow",
    outline: "border bg-transparent",
    transparent: "bg-transparent"
  }

  const inputPrimary = `border-gray-dark text-gray-dark placeholder-gray-dark focus:ring-goldenrod`;
  const colorPalettes = {
    primaryLight: cn(inputPrimary, variant === "solid" && "bg-gray-light"),
    primaryDark: cn(inputPrimary, variant === "solid" && "bg-gray-medium"),
  }

  const classes = cn(
    inputBase,
    sizes[size] || sizes.m,
    variants[variant] || variants.solid,
    colorPalettes[colorPalette] || colorPalettes.primaryDark,
    className
  )

  return (
    <input
      ref={inputRef}
      {...props}
      className={classes}
    />
  )
}
