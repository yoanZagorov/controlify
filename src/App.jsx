import { RouterProvider } from "react-router-dom";

import router from "services/router/router";
import { BreakpointProvider } from "./contexts";


export default function App() {
  return (
    <BreakpointProvider>
      <RouterProvider router={router} />
    </BreakpointProvider>
  )
}
