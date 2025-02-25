import { useActionData, useLoaderData } from "react-router";

import { loginAction, createAccountAction } from "@/services/router/actions";

import { useFlashMsg } from "@/hooks";

import { AuthForm } from "./components/AuthForm";
import { InfoWidget } from "@/components/widgets/InfoWidget";
import { AuthProvider } from "@/contexts";
import { useEffect, useState } from "react";
import { ROUTES } from "@/constants";
import { FullLogo } from "@/assets/logos/FullLogo";

export default function Auth({ type }) {
  const isCreateAccount = type === "createAccount";

  const actionData = useActionData() ?? {};
  const [errorMsg, setErrorMsg] = useState({ msg: actionData.msg, msgType: actionData.msgType }) // using local state to ensure no stale data (refreshing the actionData)
  useEffect(() => {
    if (actionData.msg !== errorMsg.msg) {
      setErrorMsg({ msg: actionData.msg, msgType: actionData.msgType });
    }
  }, [actionData.msg, actionData.resetKey]);

  const { quote, redirectData } = useLoaderData();
  const { originalPath } = redirectData;
  const [redirectMsg, setRedirectMsg] = useState({ msg: redirectData.msg, msgType: redirectData.msgType }); // same as the actionData

  const { flashMsg, clearFlashMsg } = useFlashMsg([
    {
      msg: errorMsg.msg,
      msgType: errorMsg.msgType,
      clearMsg: () => setErrorMsg({ msg: null, msgType: null })
    },
    {
      msg: redirectMsg.msg,
      msgType: redirectMsg.msgType,
      clearMsg: () => setRedirectMsg({ msg: null, msgType: null })
    },
  ], [redirectMsg, errorMsg]);

  const authFormConfig = {
    originalPath,
    isCreateAccount,
    action: isCreateAccount ? createAccountAction : loginAction,
    btnText: isCreateAccount ? "Create account" : "Log in",
    path: isCreateAccount ? ROUTES.LOGIN : ROUTES.CREATE_ACCOUNT,
    msg: isCreateAccount ? "Already have an account?" : "Don't yet have an account?",
    CTA: isCreateAccount ? "Log in!" : "Create one now!"
  }

  return (
    <div className="px-4 tab:px-6 py-12 mx-auto min-h-screen w-full max-w-screen-ml tab:max-w-7xl flex flex-col text-center">
      <header className="mx-auto w-full max-w-lg">
        <InfoWidget flashMsg={flashMsg} clearFlashMsg={clearFlashMsg} quote={quote} />
      </header >

      <main
        className="my-auto flex flex-col tab:flex-row tab:items-center gap-12 ls:gap-20">
        <div className="mt-8 tab:mt-0 tab:w-1/2">
          <FullLogo />
          <p className="ml:text-lg fhd:text-xl text-gray-dark">Take control of your finances</p>
        </div>

        <div className="hidden tab:block min-h-96 ll:min-h-[450px] h-full border-r border-navy"></div>

        <div className="tab:w-1/2">
          <AuthProvider isCreateAccount={isCreateAccount}>
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
