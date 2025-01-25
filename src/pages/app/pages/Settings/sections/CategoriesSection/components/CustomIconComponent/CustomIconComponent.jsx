export default function CustomIconComponent({ iconName, bgColor }) {
  return (
    <button className="ml-auto flex justify-center items-center size-12 rounded-full" style={{ backgroundColor: bgColor }}>
      <SvgIcon iconName={icon} className="size-1/2 fill-gray-light" />
    </button>
  )
}