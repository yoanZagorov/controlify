import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.config";

export default {
  userId: null,

  checkUserStatus() {
    return new Promise((resolve) => {
      const unsubsribe = onAuthStateChanged(auth, (authUser) => {
        unsubsribe();

        if (authUser) {
          this.userId = authUser.uid;
          resolve(true);
        } else {
          resolve(null);
        }
      })
    })
  }
}