import { redirect } from "react-router-dom";
import { getAuthUserId } from "services/firebase/db/user";

export default async function createAccountLoader() {
  console.log("createAccountLoader");
  const userId = await getAuthUserId();

  if (userId) {
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/app"
      }
    });
  }

  return new Response(null, {
    status: 200
  });
}