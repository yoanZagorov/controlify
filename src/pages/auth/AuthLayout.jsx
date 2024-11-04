import { Outlet, useLocation } from "react-router-dom";

import logo from "logos/logoGrayBg.png";

export default function AuthLayout() {
  const location = useLocation();
  const logOutMsg = location?.state?.logOutMsg;

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

        <Outlet />
      </main >
    </>
  )
}
