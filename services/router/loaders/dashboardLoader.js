import { redirect } from "react-router-dom";

import { getAuthUser } from "@/utils/auth";
import { getUser } from "services/firebase/db/user";

export default async function dashboardLoader() {
  // const authUser = await getAuthUser();

  // if (authUser) {
  //   const user = await getUser(authUser.uid);
  //   return { 
  //     user: {
  //       ...user, 
  //       id: authUser.uid
  //     } 
  //   };
  // } else {
  //   return redirect("/auth/login");
  // }
  return null;
}