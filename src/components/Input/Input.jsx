import cn from "classnames";

export default function Input({ size = "m", variant = "primary", className = "", ...props }) {
  const input = "border placeholder-opacity-50 transition-all shadow focus:outline-none focus:border-none focus:ring";

  const inputM = "py-1.5 px-2 text-base rounded-md";
  const inputL = "py-2 px-3 text-lg rounded-lg";

  const inputPrimary = "border-gray-dark bg-gray-medium text-gray-dark placeholder-gray-dark focus:ring-goldenrod"
  const inputSecondary = "";

  const classes = cn(
    input,
    size === "m" ? inputM
      : inputL,
    variant === "secondary" ? inputSecondary
      : inputPrimary,
    className
  )

  return (
    <input
      className={classes}
      {...props}
    />
  )
}
