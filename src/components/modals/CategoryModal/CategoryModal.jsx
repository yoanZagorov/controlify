import { useRouteLoaderData } from "react-router-dom"

import { getCategoriesByType } from "@/utils/category";

import { CategoryItem } from "./components/CategoryItem";
import { ToggleSwitch } from "@/components/ToggleSwitch";
import { useState } from "react";

export default function CategoryModal({ closeModal, state }) {
  const { userData: { categories } } = useRouteLoaderData("app");

  const [category, setCategory] = [state.value, state.updateState];
  const [activeOption, setActiveOption] = useState(category.type || "expense");

  function handleCategoryChange(id, name, type) {
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
        handleClick={() => handleCategoryChange(currentCategory.id, currentCategory.name, currentCategory.type)}
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
      activeClassName: "text-green-light bg-navy"
    },
    baseOptionClasses: "w-1/2 rounded-full py-1 px-3 text-center font-medium",
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
        className="mt-3 border border-gray-dark bg-gray-light"
      />

      <ul className="mt-6 grid grid-cols-3 gap-x-10 gap-y-4">
        {activeOption === "expense"
          ? expenseCategoriesEls
          : incomeCategoriesEls
        }
      </ul>
    </div>
  )
}
