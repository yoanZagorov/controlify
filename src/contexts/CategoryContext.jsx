import { createContext, useState } from "react"

export const CategoryContext = createContext(null);

export default function CategoryProvider({ children }) {
  const DEFAULT_COLOR = "#002B5B";

  const defaultCategoryData = {
    name: "New Category",
    type: "expense",
    icon: null,
    color: DEFAULT_COLOR
  }

  const [categoryData, setCategoryData] = useState(defaultCategoryData);

  function updateCategoryData(newCategoryData) {
    return setCategoryData(prevCategoryData => ({
      ...prevCategoryData,
      ...newCategoryData
    }))
  }

  function resetCategoryData() {
    setCategoryData(defaultCategoryData);
  }

  return (
    <CategoryContext.Provider value={{ categoryData, defaultCategoryData, updateCategoryData, resetCategoryData }}>
      {children}
    </CategoryContext.Provider>
  )
}
