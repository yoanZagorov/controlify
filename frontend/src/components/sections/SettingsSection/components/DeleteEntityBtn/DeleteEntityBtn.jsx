import { SvgIcon } from '#components/SvgIcon'

export default function DeleteEntityBtn({ onClick }) {
  return (
    <button
      type="button"
      className="absolute top-0 right-0 size-6"
      data-actionable={true}
      onClick={onClick}
    >
      <SvgIcon iconName="trash-can" className="size-full fill-red-light" />
    </button>
  )
}
