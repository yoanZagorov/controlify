import HouseIcon from "@/assets/icons/house.svg?react";
import WalletIcon from "@/assets/icons/wallet.svg?react";
import StatsIcon from "@/assets/icons/stats.svg?react";
import SettingsIcon from "@/assets/icons/settings.svg?react";
import CategoriesIcon from "@/assets/icons/categories.svg?react";

export const mainNavPages = [
  {
    name: "dashboard",
    icon: <HouseIcon className="w-6 h-6 tab:w-7 tab:h-7 fill-current" />
  },
  {
    name: "wallets",
    icon: <WalletIcon className="w-6 h-6 tab:w-7 tab:h-7 fill-current" />
  },
  {
    name: "reflect",
    icon: <StatsIcon className="w-6 h-6 tab:w-7 tab:h-7 fill-current" />
  },
]

export const secNavPages = [
  {
    name: "settings",
    icon: <SettingsIcon className="w-4 h-4 tab:w-5 tab:h-5 fill-current" />
  },
  {
    name: "categories",
    icon: <CategoriesIcon className="w-4 h-4 tab:w-5 tab:h-5 fill-current" />
  },
]