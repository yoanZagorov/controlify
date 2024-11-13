import { RouterProvider } from "react-router-dom";

import router from "services/router/router";
import { BreakpointProvider } from "./contexts";
import { useKeyboardFocus } from "./hooks";


export default function App() {
  useKeyboardFocus();

  return (
    <BreakpointProvider>
      <RouterProvider router={router} />
    </BreakpointProvider>
  )
}
