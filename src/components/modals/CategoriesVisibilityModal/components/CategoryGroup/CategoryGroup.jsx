import { CategoryItem } from "../CategoryItem";

export default function CategoryGroup({ type, categories }) {
  const categoriesEls = categories.map(category => {
    const { id, iconName, name } = category;

    const categoryProp = {
      iconName,
      name,
      isVisible: type === "visible"
    }

    return (
      <CategoryItem key={id} category={categoryProp} />
    )
  })
  return (
    <div>
      <span className="text-sm text-gray-dark opacity-50 uppercase">{type}</span>
      <div className="mt-4 flex flex-col gap-3">
        {categoriesEls}
      </div>
    </div>
  )
}