import { createContext, useState } from "react";

import { COLORS } from "@/constants";
import CATEGORY from "@/constants/category";

import { isObjTruthy } from "@/utils/obj";

export const CategoryContext = createContext(null);

// Used to keep the state for category submissions and updates
// The providedCategoryData is used when the operation is a category update so there already is initial data
// The providedType is used when the type should be set to a certain value and not change
export default function CategoryProvider({ providedCategoryData = {}, providedType = null, children }) {
  const defaultCategoryData = isObjTruthy(providedCategoryData) ? {
    ...providedCategoryData,
    type: providedType
      ? { value: providedType, isLocked: true } // Lock the type
      : { value: providedCategoryData.type, isLocked: false }
  } : {
    name: "New Category",
    type: {
      value: providedType || CATEGORY.DEFAULT_TYPE,
      isLocked: !!providedType
    },
    iconName: "",
    color: COLORS.ENTITIES.DEFAULT_CATEGORY_COLOR,
    id: "", // Relevant only for category updates
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
