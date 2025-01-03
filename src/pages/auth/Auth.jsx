import { useActionData, useLoaderData } from "react-router";

import { loginAction, createAccountAction } from "@/services/router/actions";

import { useFlashMsg } from "@/hooks";

import logo from "logos/logoGrayBg.png";
import { AuthForm } from "./components/AuthForm";
import { InfoWidget } from "@/components/widgets/InfoWidget";
import { AuthProvider } from "@/contexts";
import { useEffect, useState } from "react";

export default function Auth({ type }) {
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

  const isCreateAccount = type === "createAccount";

  const authFormConfig = {
    originalPath,
    isCreateAccount,
    action: isCreateAccount ? createAccountAction : loginAction,
    btnText: isCreateAccount ? "Create account" : "Log in",
    path: isCreateAccount ? "/login" : "/create-account",
    msg: isCreateAccount ? "Already have an account?" : "Don't yet have an account?",
    CTA: isCreateAccount ? "Log in!" : "Create one now!"
  }

  return (
    <div className="px-4 tab:px-6 mx-auto h-screen w-full max-w-screen-ml tab:max-w-6xl pt-12 flex flex-col text-center"> {/* To do: increase max-w value when acquired higher res logo */}
      <header className="mx-auto w-full max-w-lg">
        <InfoWidget flashMsg={flashMsg} clearFlashMsg={clearFlashMsg} quote={quote} />
      </header >

      <main
        className="my-auto flex flex-col tab:flex-row tab:items-center gap-12 ls:gap-20">
        <div className="tab:w-1/2">
          <img src={logo} />
          <p className="text-lg fhd:text-xl text-gray-dark">Take control of your finances</p>
        </div>

        <div className="hidden tab:block min-h-96 ll:min-h-[450px] h-full border-r border-navy"></div>

        <div className="tab:w-1/2">
          <AuthProvider>
            <AuthForm
              originalPath={originalPath}
              isCreateAccount={isCreateAccount}
              authFormConfig={authFormConfig}
            />
          </AuthProvider>
        </div>
      </main>
    </div>
  )
}
