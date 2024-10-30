import { SvgIcon } from "@/components/SvgIcon";
import { capitalize } from "@/utils/generic";

export default function CategoryItem({ category, updateCategory }) {
  return (
    <li
      key={category.id}
      className="flex flex-col items-center gap-2 text-center"
    >
      <button
        type="button"
        onClick={() => updateCategory(category.name)}
        className="grid place-content-center w-12 h-12 rounded-full border border-gray-dark bg-gray-light">
        <SvgIcon iconName={category.iconName} className="w-6 h-6 fill-gray-dark" />
      </button>
      <span className="text-xs text-gray-dark font-semibold">{capitalize(category.name)}</span>
    </li>
  )
}
