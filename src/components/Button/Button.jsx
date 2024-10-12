export default function Button({ children, classes, ...rest }) {
  return (
    <button
      className={classes}
      {...rest}
    >
      {children}
    </button>
  )
}