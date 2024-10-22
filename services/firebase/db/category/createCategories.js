import { collection, addDoc } from "firebase/firestore";

export default async function createCategories(userDocRef) {
  // To do: pull the data from a root defaultCategories collection
  const defaultCategories = [
    { name: 'Food', icon: '🍔', color: '#FF6347' },
    { name: 'Utilities', icon: '💡', color: '#4682B4' },
    { name: 'Transportation', icon: '🚗', color: '#32CD32' },
    { name: 'Entertainment', icon: '🎬', color: '#FFD700' },
    { name: 'Health', icon: '💊', color: '#FF69B4' },
  ];

  const categoriesCollectionRef = collection(userDocRef, "categories");

  try {
    const promises = defaultCategories.map(async (category) => {
      const { name, icon, color } = category;
      return addDoc(categoriesCollectionRef, {
        name,
        icon,
        color
      })
    })

    await Promise.all(promises);
  } catch (error) {
    console.error(error);
  }
}