import { Outlet, useLocation } from "react-router-dom";
import logo from "logos/logoGrayBg.png";
import s from "./auth.module.css";

export default function AuthLayout() {
  const location = useLocation();
  const logOutMsg = location?.state?.logOutMsg;

  return (
    <>
      {logOutMsg && <p className={s.logOutMsg}>{logOutMsg}</p>}
      
      <main className={s.main}>
        <div className={s.layoutContainer}>
          <img src={logo} />
          <p className={s.p}>Take control of your finances</p>
        </div>

        <div className={s.divider}></div>

        <Outlet />
      </main >
    </>
  )
}
