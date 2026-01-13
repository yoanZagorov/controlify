import { useMemo, useState } from 'react'

import { getCategoriesByType } from '#/utils/category'
import { isArrayTruthy } from '#/utils/array'
import { Button } from '#/components/Button'
import { CategoriesTypeToggleSwitch } from '#/components/toggle-switches/CategoriesTypeToggleSwitch'
import { CATEGORY } from '#/constants'

import { CategoryGroup } from './components/CategoryGroup'

// Used to select which wallet categories should be visible and which not
// Since it's used in a larger context (there is a higher state), it keeps a local state to avoid multiple rerenders
export default function CategoriesVisibilityModal({
  categories,
  closeModal,
  state,
}) {
  const [currentCategories, setCurrentCategories] = useState(categories)

  const [activeOption, setActiveOption] = useState(CATEGORY.DEFAULT_TYPE)
  const isExpenseCategories = activeOption === 'expense'

  const { visibleWalletCategories, hiddenWalletCategories } = useMemo(() => {
    let visibleWalletCategories = []
    let hiddenWalletCategories = []

    for (const category of currentCategories) {
      if (category.isVisible) {
        visibleWalletCategories.push(category)
      } else {
        hiddenWalletCategories.push(category)
      }
    }

    return { visibleWalletCategories, hiddenWalletCategories }
  }, [currentCategories])

  const {
    expenseCategories: visibleExpenseCategories,
    incomeCategories: visibleIncomeCategories,
  } = useMemo(
    () => getCategoriesByType(visibleWalletCategories),
    [visibleWalletCategories],
  )

  const {
    expenseCategories: hiddenExpenseCategories,
    incomeCategories: hiddenIncomeCategories,
  } = useMemo(
    () => getCategoriesByType(hiddenWalletCategories),
    [hiddenWalletCategories],
  )

  function handleVisibilityToggle(toggledCategoryId) {
    const updatedCategories = currentCategories.map((category) =>
      category.id === toggledCategoryId
        ? { ...category, isVisible: !category.isVisible }
        : category,
    )

    setCurrentCategories(updatedCategories)
  }

  function handleSaveBtnClick() {
    state.updateState(currentCategories)
    closeModal()
  }

  return (
    <div className="flex flex-col">
      <CategoriesTypeToggleSwitch
        activeOption={activeOption}
        handleToggle={() =>
          setActiveOption((prev) => (prev === 'expense' ? 'income' : 'expense'))
        }
      />

      <div className="mt-6 flex flex-col gap-4">
        {isExpenseCategories ? (
          <>
            {isArrayTruthy(visibleExpenseCategories) && (
              <CategoryGroup
                type="visible"
                categories={visibleExpenseCategories}
                handleVisibilityToggle={(toggledCategoryId) =>
                  handleVisibilityToggle(toggledCategoryId)
                }
              />
            )}
            {isArrayTruthy(hiddenExpenseCategories) && (
              <CategoryGroup
                type="hidden"
                categories={hiddenExpenseCategories}
                handleVisibilityToggle={(toggledCategoryId) =>
                  handleVisibilityToggle(toggledCategoryId)
                }
              />
            )}
          </>
        ) : (
          <>
            {isArrayTruthy(visibleIncomeCategories) && (
              <CategoryGroup
                type="visible"
                categories={visibleIncomeCategories}
                handleVisibilityToggle={(toggledCategoryId) =>
                  handleVisibilityToggle(toggledCategoryId)
                }
              />
            )}
            {isArrayTruthy(hiddenIncomeCategories) && (
              <CategoryGroup
                type="hidden"
                categories={hiddenIncomeCategories}
                handleVisibilityToggle={(toggledCategoryId) =>
                  handleVisibilityToggle(toggledCategoryId)
                }
              />
            )}
          </>
        )}
      </div>

      <Button
        size="l"
        className="mx-auto mt-10 w-full max-w-72"
        onClick={handleSaveBtnClick}
      >
        Save Changes
      </Button>
    </div>
  )
}
