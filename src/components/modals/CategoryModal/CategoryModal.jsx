import { useState } from "react";
import { useRouteLoaderData } from "react-router"

import { getCategoriesByType } from "@/utils/category";

import { CategoryItem } from "./components/CategoryItem";
import { ToggleSwitch } from "@/components/toggle-switches/ToggleSwitch";
import { CategoriesTypeToggleSwitch } from "@/components/toggle-switches/CategoriesTypeToggleSwitch";

export default function CategoryModal({ closeModal, state }) {
  const { userData: { categories } } = useRouteLoaderData("app");

  const [category, setCategory] = [state.value, state.updateState];
  const [activeOption, setActiveOption] = useState(category.type || "expense");

  function handleCategoryChange(selectedCategory) {
    const { id, name, type } = selectedCategory;

    closeModal();
    setCategory({ id, name, type });
  }

  const { expenseCategories, incomeCategories } = getCategoriesByType(categories);

  const createCategoryEls = (categories) =>
    categories.map(currentCategory => (
      <CategoryItem
        key={currentCategory.id}
        category={currentCategory}
        isActive={currentCategory.id === category.id}
        handleClick={() => handleCategoryChange(currentCategory)}
      />
    ))

  const expenseCategoriesEls = createCategoryEls(expenseCategories);
  const incomeCategoriesEls = createCategoryEls(incomeCategories);

  return (
    <div>
      <CategoriesTypeToggleSwitch
        activeOption={activeOption}
        handleToggle={() => setActiveOption(prev => prev === "expense" ? "income" : "expense")}
      />

      <ul className="mt-6 grid grid-cols-[repeat(auto-fit,80px)] justify-between items-start gap-6">
        {activeOption === "expense"
          ? expenseCategoriesEls
          : incomeCategoriesEls
        }
      </ul>
    </div>
  )
}
