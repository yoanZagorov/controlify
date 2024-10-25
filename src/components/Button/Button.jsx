import cn from "classnames";

export default function Button({ size = "m", type = "primary", className, children, ...rest }) {        
  const baseCn = "font-bold uppercase focus:outline-none transition-all shadow";

  const typeCn =
    type === "primary" ?
      "bg-navy text-goldenrod focus:ring-goldenrod hover:bg-navy-dark active:bg-navy-dark "
    : "";

  const sizeCn = 
    size === "s" ? 
      "py-2 ll:py-3 text-base ls:text-lg rounded-lg focus:ring-2" 
    : size === "m" ? 
      "py-3 ll:py-4 text-lg ls:text-xl rounded-xl focus:ring-3"
    : 
      "py-4 ll:py-5 text-xl ls:text-2xl rounded-2xl focus:ring-4";

  const classes = cn(baseCn, sizeCn, typeCn, className);

  return (
    <button
      className={classes}
      {...rest}
    >
      {children}
    </button>
  )
}