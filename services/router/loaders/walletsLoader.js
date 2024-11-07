import { getAuthUserId } from "services/firebase/db/user";

export default async function walletsLoader() {
  const userId = await getAuthUserId();

  if (!userId) {
    const pathname = new URL(request.url).pathname;
    storeRedirectData(pathname);

    return redirect("/login");
  }

  return null;
}

