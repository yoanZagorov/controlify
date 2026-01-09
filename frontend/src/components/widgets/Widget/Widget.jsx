import cn from 'classnames'

// Used a lot throughout the application so content isn't just "floating"
export default function Widget({
  size = 'm',
  colorPalette = 'primary',
  className,
  children,
}) {
  const widgetBase = 'rounded-lg shadow'

  const sizes = {
    s: 'p-3',
    m: 'p-4',
  }

  const colorPalettes = {
    primary: 'bg-gray-medium',
    secondary: 'bg-gray-light',
  }

  const widgetClasses = cn(
    widgetBase,
    sizes[size] || sizes.m,
    colorPalettes[colorPalette] || colorPalettes.primary,
    className,
  )

  return <div className={widgetClasses}>{children}</div>
}
