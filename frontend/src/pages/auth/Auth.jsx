import { useEffect, useState } from 'react'
import { useActionData, useLoaderData } from 'react-router'

import { ROUTES } from '#/constants'

import { AuthProvider } from '#/contexts'

import { loginAction, createAccountAction } from '#/services/router/actions'

import { useFlashMsg } from '#/hooks'

import { FullLogo } from '#/assets/logos/FullLogo'

import { AuthForm } from './components/AuthForm'
import { InfoWidget } from '#/components/widgets/InfoWidget'

// Rendered at /login and /create-account
export default function Auth({ type }) {
  const isCreateAccount = type === 'createAccount'

  const actionData = useActionData() ?? {}
  const [errorMsg, setErrorMsg] = useState({
    msg: actionData.msg,
    msgType: actionData.msgType,
  }) // using local state to ensure no stale data (refreshing the actionData)
  useEffect(() => {
    if (actionData.msg !== errorMsg.msg) {
      setErrorMsg({ msg: actionData.msg, msgType: actionData.msgType })
    }
  }, [actionData.msg, actionData.resetKey])

  const { quote, redirectData } = useLoaderData()
  const { originalPath } = redirectData
  const [redirectMsg, setRedirectMsg] = useState({
    msg: redirectData.msg,
    msgType: redirectData.msgType,
  }) // same as the actionData

  const { flashMsg, clearFlashMsg } = useFlashMsg(
    [
      {
        msg: errorMsg.msg,
        msgType: errorMsg.msgType,
        clearMsg: () => setErrorMsg({ msg: null, msgType: null }),
      },
      {
        msg: redirectMsg.msg,
        msgType: redirectMsg.msgType,
        clearMsg: () => setRedirectMsg({ msg: null, msgType: null }),
      },
    ],
    [redirectMsg, errorMsg],
  )

  const authFormConfig = {
    originalPath,
    isCreateAccount,
    action: isCreateAccount ? createAccountAction : loginAction,
    btnText: isCreateAccount ? 'Create account' : 'Log in',
    path: isCreateAccount ? ROUTES.LOGIN : ROUTES.CREATE_ACCOUNT,
    msg: isCreateAccount
      ? 'Already have an account?'
      : "Don't yet have an account?",
    CTA: isCreateAccount ? 'Log in!' : 'Create one now!',
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-screen-ml flex-col px-4 py-12 text-center tab:max-w-7xl tab:px-6">
      <header className="mx-auto w-full max-w-lg">
        <InfoWidget
          flashMsg={flashMsg}
          clearFlashMsg={clearFlashMsg}
          quote={quote}
        />
      </header>

      <main className="my-auto flex flex-col gap-12 tab:flex-row tab:items-center ls:gap-20">
        <div className="mt-8 tab:mt-0 tab:w-1/2">
          <FullLogo />
          <p className="text-gray-dark ml:text-lg fhd:text-xl">
            Take control of your finances
          </p>
        </div>

        <div className="hidden h-full min-h-96 border-r border-navy tab:block ll:min-h-[450px]"></div>

        <div className="tab:w-1/2">
          <AuthProvider>
            <AuthForm
              originalPath={originalPath}
              isCreateAccount={isCreateAccount}
              config={authFormConfig}
            />
          </AuthProvider>
        </div>
      </main>
    </div>
  )
}
