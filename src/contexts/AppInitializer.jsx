import { useEffect } from "react";
import createDefaultCategories from "services/firebase/db/collections/defaultCategories/createDefaultCategories";

export default function AppInitializer({ children }) {
  useEffect(() => {
    async function initializeAppData() {
      try {
        await createDefaultCategories();
      } catch(error) {
        console.error('Error initializing app data:', error);
      }
    }

    initializeAppData();
  }, []);

  return children;
}