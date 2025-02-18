import { COLORS } from "@/constants";
import CATEGORY from "@/constants/category";
import { isObjTruthy } from "@/utils/obj";
import { createContext, useState } from "react"

export const CategoryContext = createContext(null);

export default function CategoryProvider({ providedCategoryData = {}, providedType = null, children }) {
  const defaultCategoryData = isObjTruthy(providedCategoryData) ? {
    ...providedCategoryData,
    type: providedType
      ? { value: providedType, isLocked: true }
      : { value: providedCategoryData.type, isLocked: false }
  } : {
    id: "",
    name: "New Category",
    type: {
      value: providedType || CATEGORY.DEFAULT_TYPE,
      isLocked: !!providedType
    },
    iconName: "",
    color: COLORS.ENTITIES.DEFAULT_CATEGORY_COLOR
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
