import { RouterProvider } from 'react-router'

import { BreakpointProvider } from './contexts'
import { useNavigationMethod } from './hooks'
import router from './services/router/router'

export default function App() {
  useNavigationMethod()

  return (
    <BreakpointProvider>
      <RouterProvider router={router} />
    </BreakpointProvider>
  )
}
