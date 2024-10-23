import { Outlet, useLoaderData } from "react-router-dom";

import { Header } from "@/components/Header";
import { UserProvider } from "@/contexts";

export default function AppLayout() {
  const user = useLoaderData().user;

  return (
    <>
      <UserProvider value={user}>
        <Header />
        <Outlet />
      </UserProvider>
    </>
  )
}