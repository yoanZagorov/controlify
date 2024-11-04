import { useActionData, useLocation } from "react-router-dom";

import { loginAction, createAccountAction } from "services/router/actions";

import logo from "logos/logoGrayBg.png";

import { AuthForm } from "./components/AuthForm";

export default function Auth({ type }) {
  const location = useLocation();
  const logOutMsg = location?.state?.logOutMsg;

  const actionData = useActionData();
  const errorMsg = actionData?.errorMsg;

  const isCreateAccount = type === "createAccount";

  return (
    <>
      {logOutMsg && <p className="mt-12 text-lg text-green-light self-center">{logOutMsg}</p>}

      <main
        className="m-auto px-4 tab:px-10 w-screen max-w-[425px] tab:max-w-[1920px] flex flex-col tab:flex-row justify-center tab:items-center gap-12 text-center">
        <div className="tab:w-1/2 flex flex-col justify-center items-center">
          <img src={logo} />
          <p className="text-gray-dark text-lg ls:text-xl lm:text-2xl fhd:text-3xl">Take control of your finances</p>
        </div>

        <div className="hidden tab:block h-96 border-r border-navy"></div>

        <div className="tab:w-1/2 flex flex-col gap-6 justify-center items-center">
          {errorMsg &&
            <p className="text-red-dark max-w-[425px] ml:text-lg tab:text-xl">{errorMsg}</p>
          }

          <AuthForm
            isCreateAccount={isCreateAccount}
            action={isCreateAccount ? createAccountAction : loginAction}
            btnText={isCreateAccount ? "Create account" : "Log in"}
            path={isCreateAccount ? "/login" : "/create-account"}
            msg={isCreateAccount ? "Already have an account?" : "Don't yet have an account?"}
            CTA={isCreateAccount ? "Log in!" : "Create one now!"}
          />
        </div>
      </main >
    </>
  )
}
