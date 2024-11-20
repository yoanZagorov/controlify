import { AppError } from "@/utils/errors";
import { collection, addDoc, doc } from "firebase/firestore";

export default function createCategories(userDocRef, batch) {
  // To do: pull the data from a root defaultCategories collection

  const defaultCategories = [
    { name: "groceries", iconName: "shopping-cart", type: "expense", color: "#4CAF50" },
    { name: "shopping", iconName: "shopping-bag", type: "expense", color: "#FF5722" },
    { name: "house", iconName: "house", type: "expense", color: "#795548" },
    { name: "transport", iconName: "bus", type: "expense", color: "#3F51B5" },
    { name: "travel", iconName: "plane", type: "expense", color: "#009688" },
    { name: "entertainment", iconName: "masks-theater", type: "expense", color: "#FFC107" },
    { name: "dining-out", iconName: "utensils", type: "expense", color: "#FF9800" },
    { name: "health", iconName: "heart-pulse", type: "expense", color: "#8BC34A" },
    { name: "family-and-friends", iconName: "family-group", type: "expense", color: "#F44336" },
    { name: "bills", iconName: "money-bill", type: "expense", color: "#9E9E9E" },
    { name: "education", iconName: "graduation-cap", type: "expense", color: "#2196F3" },
    { name: "sport-and-hobbies", iconName: "football", type: "expense", color: "#CDDC39" },
    { name: "mortgage", iconName: "mortgage", type: "expense", color: "#D4AF37" },
    { name: "other", iconName: "clipboard-question", type: "expense", color: "#9C27B0" },

    { name: "salary", iconName: "briefcase", type: "income", color: "#FFD700" },
    { name: "savings", iconName: "piggy-bank", type: "income", color: "#607D8B" },
    { name: "investments", iconName: "money-bill-stock-up", type: "income", color: "#4169E1" },
    { name: "other", iconName: "clipboard-question", type: "income", color: "#9C27B0" },
  ];

  const categoriesCollectionRef = collection(userDocRef, "categories");

  defaultCategories.forEach(category => {
    const categoryDocRef = doc(categoriesCollectionRef);
    batch.set(categoryDocRef, { ...category })
  })
}