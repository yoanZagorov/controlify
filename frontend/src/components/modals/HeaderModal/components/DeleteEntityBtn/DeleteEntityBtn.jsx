import { SvgIcon } from '#/components/SvgIcon'

export default function DeleteEntityBtn({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="ml-auto flex justify-center items-center gap-6 size-10 min-w-10 rounded-md bg-gray-light focus-goldenrod"
    >
      <SvgIcon iconName="trash-can" className="size-6 fill-red-dark" />
    </button>
  )
}
