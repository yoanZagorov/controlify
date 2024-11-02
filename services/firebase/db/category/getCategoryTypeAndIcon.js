import { doc, getDoc } from "firebase/firestore";
import { db } from "services/firebase/firebase.config";

export default async function getCategoryTypeAndIcon(userId, categoryId) {
  const categoryDocRef = doc(db, `users/${userId}/categories/${categoryId}`);

  try {
    const docSnap = await getDoc(categoryDocRef);

    if (docSnap.exists()) {
      console.log(docSnap.data().type);
      const type = docSnap.data().type;
      const iconName = docSnap.data().iconName;

      return ({
        type,
        iconName
      });
    } else {
      throw new Error(`A category with the id ${categoryId} doesn't seem to exist`);
    }
  } catch (error) {
    console.error(error);
  }
}