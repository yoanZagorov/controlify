import { SvgIcon } from "@/components/SvgIcon";
import { formatEntityName } from "@/utils/formatting";

export default function CategoryItem({ iconName, name, color, handleClick }) {
  return (
    <button className="p-3 flex items-center gap-4 rounded-lg bg-gray-light" onClick={handleClick}>
      <div className="flex justify-center items-center size-8 rounded-full" style={{ backgroundColor: color }}>
        <SvgIcon iconName={iconName} className="size-1/2 fill-gray-light" />
      </div>

      <span className="text-sm text-gray-dark font-semibold">
        {formatEntityName(name)}
      </span>

      <SvgIcon iconName="pen" className="ml-auto size-4 fill--gray-dark" />
    </button>
  )
}