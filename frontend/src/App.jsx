import { RouterProvider } from "react-router";

import router from "@/services/router/router";
import { BreakpointProvider } from "./contexts";
import { useKeyboardFocus } from "./hooks";

export default function App() {
  useKeyboardFocus();

  return (
    <BreakpointProvider>
      <RouterProvider
        router={router}
        future={{
          v7_startTransition: true,
        }}
      />
    </BreakpointProvider>
  )
}
