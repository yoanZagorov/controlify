import { useRouteError } from 'react-router'

import { ErrorWrapper } from '../ErrorWrapper'

export default function RootError() {
  const error = useRouteError()
  const errorMsg = error?.data?.msg || error?.message

  return <ErrorWrapper error={{ ...(errorMsg ? { msg: errorMsg } : {}) }} />
}
