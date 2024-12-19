import cn from "classnames";

export default function Input({ size = "m", variant = "solid", colorPalette = "primaryDark", inputRef = null, className = "", ...props }) {
  const input = cn(
    "placeholder-opacity-50 transition-[box-shadow] border focus:border-opacity-0 focus:outline-none focus:ring",
  )

  const inputM = "py-1.5 px-2 text-base rounded-md";
  const inputL = "py-2 px-3 text-lg rounded-lg";

  const inputSolid = "shadow";
  const inputOutline = "bg-transparent";

  const inputPrimary = `border-gray-dark text-gray-dark placeholder-gray-dark focus:ring-goldenrod`;

  const inputPrimaryLight = cn(
    inputPrimary,
    variant === "solid" && "bg-gray-light"
  );

  const inputPrimaryDark = cn(
    inputPrimary,
    variant === "solid" && "bg-gray-medium"
  );

  const classes = cn(
    input,
    size === "m" ? inputM
      : inputL,
    variant === "solid" ? inputSolid
      : inputOutline,
    colorPalette === "primaryLight" ? inputPrimaryLight
      : inputPrimaryDark,
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
