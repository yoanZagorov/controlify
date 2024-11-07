import firebaseErrorsMap from "./firebaseErrorsMap";

export default function checkFirebaseError(code) {
  const error = firebaseErrorsMap[code];

  return error || null;
}