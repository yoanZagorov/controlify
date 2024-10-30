import { collection, addDoc } from "firebase/firestore";

export default async function createCategories(userDocRef) {
  // To do: pull the data from a root defaultCategories collection
  // To do: add circles arround the icons with an option for a custom color and make the actual icons one color (like white)
  // To do: normalize the names and create formatting functions

  const defaultCategories = [
    { name: "Groceries", iconName: "shopping-cart", type: "expense" },
    { name: "Shopping", iconName: "shopping-bag", type: "expense" },
    { name: "House", iconName: "house", type: "expense" },
    { name: "Transport", iconName: "bus", type: "expense" },
    { name: "Entertainment", iconName: "masks-theater", type: "expense" },
    { name: "Dining Out", iconName: "utensils", type: "expense" },
    { name: "Health", iconName: "heart-pulse", type: "expense" },
    { name: "Family & Friends", iconName: "family-group", type: "expense" },
    { name: "Bills", iconName: "money-bill", type: "expense" },
    { name: "Education", iconName: "graduation-cap", type: "expense" },
    { name: "Sport & Hobbies", iconName: "football", type: "expense" },
    { name: "Other", iconName: "clipboard-question", type: "expense" },

    { name: "Salary", iconName: "briefcase", type: "income" },
    { name: "Savings", iconName: "piggy-bank", type: "income" },
    { name: "Investments", iconName: "money-bill-stock-up", type: "income" },
    { name: "Other", iconName: "clipboard-question", type: "income" },
  ];

  const categoriesCollectionRef = collection(userDocRef, "categories");

  try {
    const promises = defaultCategories.map(async (category) => {
      const { name, iconName, type } = category;
      return addDoc(categoriesCollectionRef, {
        name,
        iconName,
        type
      })
    })

    await Promise.all(promises);
  } catch (error) {
    console.error(error);
  }
}