import { useState } from "react";
import { useRouteLoaderData } from "react-router-dom"

import { useTransaction } from "@/utils/hooks";

import { getCategoriesByType } from "@/utils/category";
import { CategoryItem } from "./components/CategoryItem";
import { ToggleSwitch } from "@/components/ToggleSwitch";

export default function CategoryModal({ closeModal }) {
  const [isExpenses, setExpenses] = useState(true);
  const { transactionData, updateTransactionData } = useTransaction();
  const { categories } = useRouteLoaderData("app");

  function handleCategoryTypeChange() {
    setExpenses(prev => !prev);
    updateTransactionData({
      categoryType: transactionData.categoryType === "expenses" ? "income" : "expenses"
    });
  }

  function handleCategoryChange(categoryName) {
    updateTransactionData({ category: categoryName });
    closeModal();
  }

  const { expenseCategories, incomeCategories } = getCategoriesByType(categories);

  const expenseCategoriesEls = expenseCategories.map(category => (
    <CategoryItem key={category.id} category={category} updateCategory={handleCategoryChange} />
  ));

  const incomeCategoriesEls = incomeCategories.map(category => (
    <CategoryItem key={category.id} category={category} updateCategory={handleCategoryChange} />
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
        className="mt-3 border border-gray-dark bg-gray-light"
        options={toggleSwitchOptions}
        addHandleToggle={handleCategoryTypeChange}
      />

      <ul className="mt-6 grid grid-cols-3 gap-x-10 gap-y-4">
        {isExpenses
          ? expenseCategoriesEls
          : incomeCategoriesEls
        }
      </ul>
    </div>
  )
}
