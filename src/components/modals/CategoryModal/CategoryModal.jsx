import { useState } from "react";
import { useRouteLoaderData } from "react-router"

import { getCategoriesByType } from "@/utils/category";

import { CategoryItem } from "./components/CategoryItem";
import { ToggleSwitch } from "@/components/ToggleSwitch";

export default function CategoryModal({ closeModal, state }) {
  const { userData: { categories } } = useRouteLoaderData("app");

  const [category, setCategory] = [state.value, state.updateState];
  const [activeOption, setActiveOption] = useState(category.type || "expense");

  function handleCategoryChange(selectedCategory) {
    closeModal();
    setCategory(selectedCategory);
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

  const toggleSwitchOptions = {
    firstOption: {
      name: "expense",
      className: "text-red-dark",
      activeClassName: "text-red-light"
    },
    secondOption: {
      name: "income",
      className: "text-green-dark",
      activeClassName: "text-green-light"
    },
    baseOptionClasses: "w-1/2 rounded-full py-1 px-3 text-center font-medium focus-visible:outline-goldenrod transition-colors",
    baseActiveOptionClasses: "bg-navy"
  }

  function handleToggle() {
    setActiveOption(prev =>
      prev === toggleSwitchOptions.firstOption.name
        ? toggleSwitchOptions.secondOption.name
        : toggleSwitchOptions.firstOption.name);
  }

  return (
    <div>
      <ToggleSwitch
        options={toggleSwitchOptions}
        activeOption={activeOption}
        handleToggle={handleToggle}
        className="border border-gray-dark bg-gray-light"
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
