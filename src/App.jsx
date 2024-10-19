import { RouterProvider } from "react-router-dom";
import router from "/services/router/router.jsx";
import { AuthProvider } from "./contexts";

export default function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  )
}
