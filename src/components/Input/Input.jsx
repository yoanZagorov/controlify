export default function Input({ type, name, placeholder, classes }) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className={classes}
      required
    />
  )
}