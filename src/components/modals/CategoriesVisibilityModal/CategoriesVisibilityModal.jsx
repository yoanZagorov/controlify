import { CategoriesTypeToggleSwitch } from "@/components/toggle-switches/CategoriesTypeToggleSwitch";
import { useState } from "react";
import { useRouteLoaderData } from "react-router";
import { CategoryItem } from "../CategoryModal/components/CategoryItem";
import { CategoryGroup } from "./components/CategoryGroup";
import { getCategoriesByType } from "@/utils/category";

export default function CategoriesVisibilityModal({ categories, closeModal, state }) {
  const [activeOption, setActiveOption] = useState("expense");
  const isExpenseCategories = activeOption === "expense";

  let visibleWalletCategories = [];
  let hiddenWalletCategories = [];

  for (const category of categories) {
    if (category.isVisible) {
      visibleWalletCategories.push(category);
    } else {
      hiddenWalletCategories.push(category);
    }
  }

  const [visibleCategories, setVisibleCategories] = useState(visibleWalletCategories);
  const [hiddenCategories, setHiddenCategories] = useState(hiddenWalletCategories);

  console.log(visibleCategories);
  console.log(hiddenCategories);

  // const { expenseCategories: visibleExpenseCategories, incomeCategories: visibleIncomeCategories } = getCategoriesByType(visibleCategories);
  // const { expenseCategories: hiddenExpenseCategories, incomeCategories: hiddenIncomeCategories } = getCategoriesByType(hiddenCategories);

  return (
    <>
      <CategoriesTypeToggleSwitch
        activeOption={activeOption}
        handleToggle={() => setActiveOption(prev => prev === "expense" ? "income" : "expense")}
      />

      <div className="mt-6 flex flex-col gap-4">
        {/* {isExpenseCategories ? (
          <>
            <CategoryGroup type="visible" categories={visibleExpenseCategories} />
            <CategoryGroup type="hidden" categories={hiddenExpenseCategories} />
          </>
        ) : (
          <>
            <CategoryGroup type="visible" categories={visibleIncomeCategories} />
            <CategoryGroup type="hidden" categories={hiddenIncomeCategories} />
          </>
        )
        } */}
      </div>
    </>
  )
}