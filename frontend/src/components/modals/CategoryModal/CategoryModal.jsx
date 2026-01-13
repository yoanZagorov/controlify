import { useState } from 'react'

import { getCategoriesByType } from '#/utils/category'

import { CategoriesTypeToggleSwitch } from '#/components/toggle-switches/CategoriesTypeToggleSwitch'
import { CategoryItem } from './components/CategoryItem'

// Used to select a transaction's category
export default function CategoryModal({
  categories,
  defaultType,
  isToggleSwitchDisabled,
  closeModal,
  state,
}) {
  const [activeOption, setActiveOption] = useState(
    state.value.type || defaultType,
  )

  function handleCategoryChange(selectedCategory) {
    const { id, name, type } = selectedCategory

    closeModal()
    state.updateState({ id, name, type })
  }

  const { expenseCategories, incomeCategories } =
    getCategoriesByType(categories)

  const createCategoryEls = (categories) =>
    categories.map((currentCategory) => (
      <CategoryItem
        key={currentCategory.id}
        category={currentCategory}
        isActive={currentCategory.id === state.value.id}
        handleClick={() => handleCategoryChange(currentCategory)}
      />
    ))

  const expenseCategoriesEls = createCategoryEls(expenseCategories)
  const incomeCategoriesEls = createCategoryEls(incomeCategories)

  return (
    <div>
      <CategoriesTypeToggleSwitch
        activeOption={activeOption}
        handleToggle={() =>
          setActiveOption((prev) => (prev === 'expense' ? 'income' : 'expense'))
        }
        isToggleSwitchDisabled={isToggleSwitchDisabled}
      />

      <ul className="mt-6 grid grid-cols-[repeat(auto-fit,80px)] items-start justify-between gap-6">
        {activeOption === 'expense'
          ? expenseCategoriesEls
          : incomeCategoriesEls}
      </ul>
    </div>
  )
}
