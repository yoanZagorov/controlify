export default function getCategoriesByType(categories) {
  let expenseCategories = []
  let incomeCategories = []

  // Making sure the "Other" category is showed last
  let expenseOtherCategory
  let incomeOtherCategory

  for (const category of categories) {
    if (category.name === 'other') {
      if (category.type === 'expense') {
        expenseOtherCategory = category
      } else {
        incomeOtherCategory = category
      }
    } else {
      if (category.type === 'expense') {
        expenseCategories.push(category)
      } else {
        incomeCategories.push(category)
      }
    }
  }

  expenseOtherCategory && expenseCategories.push(expenseOtherCategory)
  incomeOtherCategory && incomeCategories.push(incomeOtherCategory)

  return { expenseCategories, incomeCategories }
}
