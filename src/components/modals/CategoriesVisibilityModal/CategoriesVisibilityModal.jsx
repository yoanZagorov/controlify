import { useState } from "react";

import { getCategoriesByType } from "@/utils/category";

import { Button } from "@/components/Button";
import { CategoriesTypeToggleSwitch } from "@/components/toggle-switches/CategoriesTypeToggleSwitch";
import { CategoryGroup } from "./components/CategoryGroup";

export default function CategoriesVisibilityModal({ categories, closeModal, state }) {
  const [currentCategories, setCurrentCategories] = useState(categories);

  const [activeOption, setActiveOption] = useState("expense");
  const isExpenseCategories = activeOption === "expense";

  let visibleWalletCategories = [];
  let hiddenWalletCategories = [];

  for (const category of currentCategories) {
    if (category.isVisible) {
      visibleWalletCategories.push(category);
    } else {
      hiddenWalletCategories.push(category);
    }
  }

  const { expenseCategories: visibleExpenseCategories, incomeCategories: visibleIncomeCategories } = getCategoriesByType(visibleWalletCategories);
  const { expenseCategories: hiddenExpenseCategories, incomeCategories: hiddenIncomeCategories } = getCategoriesByType(hiddenWalletCategories);

  function handleVisibilityToggle(toggledCategoryId) {
    const updatedCategories = currentCategories.map(category =>
      category.id === toggledCategoryId
        ? { ...category, isVisible: !category.isVisible }
        : category
    )

    setCurrentCategories(updatedCategories);
  }

  function handleSaveBtnClick() {
    state.updateState(currentCategories);
    closeModal();
  }

  return (
    <div className="flex flex-col">
      <CategoriesTypeToggleSwitch
        activeOption={activeOption}
        handleToggle={() => setActiveOption(prev => prev === "expense" ? "income" : "expense")}
      />

      <div className="mt-6 flex flex-col gap-4">
        {isExpenseCategories ? (
          <>
            {visibleExpenseCategories.length ?
              <CategoryGroup
                type="visible"
                categories={visibleExpenseCategories}
                handleVisibilityToggle={(toggledCategoryId) => handleVisibilityToggle(toggledCategoryId)}
              /> : ""
            }
            {hiddenExpenseCategories.length ?
              <CategoryGroup
                type="hidden"
                categories={hiddenExpenseCategories}
                handleVisibilityToggle={(toggledCategoryId) => handleVisibilityToggle(toggledCategoryId)}
              /> : ""
            }
          </>
        ) : (
          <>
            {visibleIncomeCategories.length ?
              <CategoryGroup
                type="visible"
                categories={visibleIncomeCategories}
                handleVisibilityToggle={(toggledCategoryId) => handleVisibilityToggle(toggledCategoryId)}
              /> : ""
            }
            {hiddenIncomeCategories.length ?
              <CategoryGroup
                type="hidden"
                categories={hiddenIncomeCategories}
                handleVisibilityToggle={(toggledCategoryId) => handleVisibilityToggle(toggledCategoryId)}
              /> : ""
            }
          </>
        )
        }
      </div>

      <Button
        size="l"
        className="mt-10 w-full mx-auto max-w-72"
        onClick={handleSaveBtnClick}
      >
        Save Changes
      </Button>
    </div>
  )
}