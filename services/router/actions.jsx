import { verifyCredentials } from "@/utils/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "services/firebase";

export async function createAccountAction({ request }) {
  try {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");

    const {verifiedEmail, verifiedPassword} = verifyCredentials({ email, password });
    const userCredential = await createUserWithEmailAndPassword(auth, verifiedEmail, verifiedPassword);

    console.log(userCredential);
  } catch (error) {
    console.error(error);
    return error.message;
  }

  return null;
}

export async function loginAction() {
  console.log("loginAction");
  return null;
}