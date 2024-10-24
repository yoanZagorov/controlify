import HouseIcon from "@/assets/icons/house.svg?react";
import WalletIcon from "@/assets/icons/wallet.svg?react";
import StatsIcon from "@/assets/icons/stats.svg?react";
import SettingsIcon from "@/assets/icons/settings.svg?react";
import CategoriesIcon from "@/assets/icons/categories.svg?react";

import s from "./Sidebar.module.css";

export const mainNavPages = [
  {
    name: "dashboard",
    icon: <HouseIcon className={s.mainNavIcon} />
  },
  {
    name: "wallets",
    icon: <WalletIcon className={s.mainNavIcon} />
  },
  {
    name: "reflect",
    icon: <StatsIcon className={s.mainNavIcon} />
  },
]

export const secNavPages = [
  {
    name: "settings",
    icon: <SettingsIcon className={s.secNavIcon} />
  },
  {
    name: "categories",
    icon: <CategoriesIcon className={s.secNavIcon} />
  },
]