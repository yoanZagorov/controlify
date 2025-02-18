import { SvgIcon } from "@/components/SvgIcon";

export default function IconDeleteBtn({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="ml-auto flex justify-center items-center focus-goldenrod"
    >
      <SvgIcon iconName="trash-can" className="size-5 fill-red-dark" />
    </button>
  )
}