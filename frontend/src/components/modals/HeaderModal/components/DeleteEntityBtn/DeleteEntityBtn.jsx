import { SvgIcon } from '#/components/SvgIcon'

export default function DeleteEntityBtn({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="focus-goldenrod ml-auto flex size-10 min-w-10 items-center justify-center gap-6 rounded-md bg-gray-light"
    >
      <SvgIcon iconName="trash-can" className="size-6 fill-red-dark" />
    </button>
  )
}
