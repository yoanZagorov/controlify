import { CategoryItem } from "../CategoryItem";

export default function CategoryGroup({ type, categories, handleVisibilityToggle }) {
  const categoriesEls = categories.map(category => (
    <CategoryItem key={category.id} category={category} handleVisibilityToggle={handleVisibilityToggle} />
  ))

  return (
    <div>
      <span className="text-xs text-gray-dark opacity-50 font-bold uppercase">{type}</span>
      <div className="mt-4 flex flex-col gap-4">
        {categoriesEls}
      </div>
    </div>
  )
}