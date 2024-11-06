import { getAuthUserId } from "services/firebase/db/user";

export default async function dashboardLoader() {
  const userId = await getAuthUserId();

  if (!userId) {
    return redirect("/login");
  }

  return null;
}

