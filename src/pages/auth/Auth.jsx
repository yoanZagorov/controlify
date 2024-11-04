import { useActionData, useLocation } from "react-router-dom";

import { loginAction, createAccountAction } from "services/router/actions";

import logo from "logos/logoGrayBg.png";

import { getRandomItem } from "@/utils/array";
import { quotes } from "./data";

import { AuthForm } from "./components/AuthForm";
import { Widget } from "@/components/Widget";
import { Quote } from "@/components/Quote";

export default function Auth({ type }) {
  const location = useLocation();
  const logOutMsg = location?.state?.logOutMsg;

  const actionData = useActionData();
  const errorMsg = actionData?.errorMsg;

  const isCreateAccount = type === "createAccount";

  return (
    <div className="page__wrapper mx-auto h-screen w-full max-w-screen-ml tab:max-w-6xl pt-12 flex flex-col"> {/* To do: increase max-w value when acquired higher res logo */}
      <header className="mx-auto tab:max-w-lg">
        <Widget type="wrapper" size="s">
          {logOutMsg ? (
            <p className="text-center font-semibold text-lg text-green-dark">{logOutMsg}</p>
          ) : (
            <Quote quote={getRandomItem(quotes)} />
          )}
        </Widget>
      </header>

      <main
        className="my-auto flex flex-col tab:flex-row tab:items-center gap-12 ls:gap-20 text-center">
        <div className="tab:w-1/2">
          <img src={logo} />
          <p className="text-lg fhd:text-xl text-gray-dark">Take control of your finances</p>
        </div>

        <div className="hidden tab:block min-h-96 ll:min-h-[450px] h-full border-r border-navy"></div>

        <div className="tab:w-1/2">
          {errorMsg &&
            <p className="text-lg fhd:text-xl text-red-dark">{errorMsg}</p>
          }

          <AuthForm
            isCreateAccount={isCreateAccount}
            action={isCreateAccount ? createAccountAction : loginAction}
            btnText={isCreateAccount ? "Create account" : "Log in"}
            path={isCreateAccount ? "/login" : "/create-account"}
            msg={isCreateAccount ? "Already have an account?" : "Don't yet have an account?"}
            CTA={isCreateAccount ? "Log in!" : "Create one now!"}
            className={errorMsg && "mt-8"}
          />
        </div>
      </main >
    </div >
  )
}
