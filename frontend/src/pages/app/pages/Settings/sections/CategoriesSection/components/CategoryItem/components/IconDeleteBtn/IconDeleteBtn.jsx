import { SvgIcon } from '#/components/SvgIcon'

export default function IconDeleteBtn({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="focus-goldenrod ml-auto flex items-center justify-center"
    >
      <SvgIcon iconName="trash-can" className="size-5 fill-red-dark" />
    </button>
  )
}
