import { SvgIcon } from '#/components/SvgIcon'

export default function DeleteEntityBtn({ onClick }) {
  return (
    <button
      type="button"
      className="absolute right-0 top-0 size-6"
      data-actionable={true}
      onClick={onClick}
    >
      <SvgIcon iconName="trash-can" className="size-full fill-red-light" />
    </button>
  )
}
