import { useState } from "react";

import { getCategoriesByType } from "@/utils/category";

import { CategoriesTypeToggleSwitch } from "@/components/toggle-switches/CategoriesTypeToggleSwitch";
import { CategoryItem } from "./components/CategoryItem";

export default function CategoryModal({ categories, defaultType, isToggleSwitchDisabled, closeModal, state }) {
  const [category, setCategory] = [state.value, state.updateState];
  const [activeOption, setActiveOption] = useState(category.type || defaultType);

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
        isToggleSwitchDisabled={isToggleSwitchDisabled}
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
