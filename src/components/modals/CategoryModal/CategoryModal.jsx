import { useRouteLoaderData } from "react-router-dom"

import { getCategoriesByType } from "@/utils/category";

import { CategoryItem } from "./components/CategoryItem";
import { ToggleSwitch } from "@/components/ToggleSwitch";

export default function CategoryModal({ closeModal, state }) {
  const [category, setCategory] = [state.category.value, state.category.updateState];
  const [categoriesType, setCategoriesType] = [state.categoriesType.value, state.categoriesType.updateState];

  const { categories } = useRouteLoaderData("app");

  function handleCategoryTypeChange() {
    setCategoriesType(prev => prev === "expenses" ? "income" : "expenses");
  }

  function handleCategoryChange({ name, id }) {
    closeModal();
    setCategory({ name, id });
  }

  const { expenseCategories, incomeCategories } = getCategoriesByType(categories);

  const expenseCategoriesEls = expenseCategories.map(expenseCategory => (
    <CategoryItem
      key={expenseCategory.id}
      category={expenseCategory}
      isActive={expenseCategory.id === category.id}
      handleCategoryChange={handleCategoryChange}
    />
  ));

  const incomeCategoriesEls = incomeCategories.map(incomeCategory => (
    <CategoryItem
      key={incomeCategory.id}
      category={incomeCategory}
      isActive={incomeCategory.id === category.id}
      handleCategoryChange={handleCategoryChange}
    />
  ));

  const toggleSwitchOptions = {
    firstOption: {
      name: "Expenses",
      className: "text-red-dark",
      activeClassName: "text-red-light"
    },
    secondOption: {
      name: "Income",
      className: "text-green-dark",
      activeClassName: "text-green-light bg-navy"
    },
    baseOptionClasses: "w-1/2 rounded-full py-1 px-3 text-center font-medium",
    baseActiveOptionClasses: "bg-navy"
  }

  return (
    <div>
      <ToggleSwitch
        options={toggleSwitchOptions}
        addHandleToggle={handleCategoryTypeChange}
        className="mt-3 border border-gray-dark bg-gray-light"
      />

      <ul className="mt-6 grid grid-cols-3 gap-x-10 gap-y-4">
        {categoriesType === "expenses"
          ? expenseCategoriesEls
          : incomeCategoriesEls
        }
      </ul>
    </div>
  )
}
