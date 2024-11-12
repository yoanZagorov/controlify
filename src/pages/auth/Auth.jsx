import { useActionData, useLoaderData } from "react-router-dom";

import { loginAction, createAccountAction } from "services/router/actions";

import logo from "logos/logoGrayBg.png";

import { AuthForm } from "./components/AuthForm";
import { Widget } from "@/components/Widget";
import { Quote } from "@/components/Quote";
import { Notification } from "@/components/Notification";
import { useEffect, useState } from "react";

export default function Auth({ type }) {
  const { msg: errorMsg, msgType: errorMsgType } = useActionData() ?? {};

  const { quote, redirectData } = useLoaderData();
  const { originalPath, msg: redirectMsg, msgType: redirectMsgType } = redirectData;

  const [flashMsg, setFlashMsg] = useState({
    msg: errorMsg || redirectMsg || null,
    msgType: errorMsgType || redirectMsgType || null
  });

  useEffect(() => {
    if (!flashMsg) {
      if (errorMsg) {
        setFlashMsg({ msg: errorMsg, msgType: errorMsgType });
      } else if (redirectMsg) {
        setFlashMsg({ msg: redirectMsg, msgType: redirectMsgType });
      }
    }
  }, [errorMsg, redirectData])

  const isCreateAccount = type === "createAccount";

  const authFormConfig = {
    action: isCreateAccount ? createAccountAction : loginAction,
    btnText: isCreateAccount ? "Create account" : "Log in",
    path: isCreateAccount ? "/login" : "/create-account",
    msg: isCreateAccount ? "Already have an account?" : "Don't yet have an account?",
    CTA: isCreateAccount ? "Log in!" : "Create one now!"
  }

  return (
    <div className="page__wrapper mx-auto h-screen w-full max-w-screen-ml tab:max-w-6xl pt-12 flex flex-col text-center"> {/* To do: increase max-w value when acquired higher res logo */}
      <header className="mx-auto w-full max-w-lg">
        <Widget type="wrapper" size="s">
          {flashMsg ? (
            <Notification type={flashMsg.msgType} clearMsg={() => setFlashMsg(null)}>
              {flashMsg.msg}
            </Notification>
          ) : (
            <Quote quote={quote} />
          )}
        </Widget>
      </header >

      <main
        className="my-auto flex flex-col tab:flex-row tab:items-center gap-12 ls:gap-20">
        <div className="tab:w-1/2">
          <img src={logo} />
          <p className="text-lg fhd:text-xl text-gray-dark">Take control of your finances</p>
        </div>

        <div className="hidden tab:block min-h-96 ll:min-h-[450px] h-full border-r border-navy"></div>

        <div className="tab:w-1/2">
          <AuthForm
            originalPath={originalPath}
            isCreateAccount={isCreateAccount}
            authFormConfig={authFormConfig}
          />
        </div>
      </main >
    </div >
  )
}
