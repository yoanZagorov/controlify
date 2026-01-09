import iconComponentsMap from './iconComponentsMap'

export default function SvgIcon({ iconName, ...props }) {
  const IconComponent = iconComponentsMap[iconName]

  return IconComponent ? <IconComponent {...props} /> : <div {...props}></div>
}
