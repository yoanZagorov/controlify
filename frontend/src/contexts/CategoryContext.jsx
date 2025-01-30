import { createContext, useState } from "react"

export const CategoryContext = createContext(null);

export default function CategoryProvider({ prepopulatedCategoryData = null, type = null, children }) {
  const DEFAULT_COLOR = "#009688";

  const defaultCategoryData = prepopulatedCategoryData ?
    {
      ...prepopulatedCategoryData,
      ...(type ? {
        type: {
          value: type,
          isPreselected: true
        }
      } : {})
    } :
    {
      id: "",
      name: "New Category",
      type: {
        value: type || "expense",
        isPreselected: !!type
      },
      iconName: null,
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
