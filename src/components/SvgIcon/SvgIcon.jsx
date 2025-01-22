// Header
import HamburgerIcon from "@/assets/icons/hamburger.svg?react";
import UserIcon from "@/assets/icons/user-circle.svg?react";
import HouseIcon from "@/assets/icons/house.svg?react";
import WalletIcon from "@/assets/icons/wallet.svg?react";
import StatsIcon from "@/assets/icons/stats.svg?react";
import SettingsIcon from "@/assets/icons/settings.svg?react";
import CategoriesIcon from "@/assets/icons/categories.svg?react";
import LogOutIcon from "@/assets/icons/log-out.svg?react";

// Dashboard
import ScaleIcon from "@/assets/icons/scale.svg?react";
import CalendarIcon from "@/assets/icons/calendar.svg?react";

// Wallets
import CalendarMonthsIcon from "@/assets/icons/calendar-days.svg?react";
import HistoryIcon from "@/assets/icons/clock-rotate-left-solid.svg?react";
import StackedCoinsIcon from "@/assets/icons/stacked-coins.svg?react";
import FilterIcon from "@/assets/icons/filter.svg?react";
import ArrowsRotateIcon from "@/assets/icons/arrows-rotate.svg?react";
import ArrowUpIcon from "@/assets/icons/arrow-up.svg?react";
import ArrowDownIcon from "@/assets/icons/arrow-down.svg?react";
import AnglesLeftIcon from "@/assets/icons/angles-left.svg?react";
import AnglesRightIcon from "@/assets/icons/angles-right.svg?react";
import HeadingIcon from "@/assets/icons/heading.svg?react";
import CoinsStackedIcon from "@/assets/icons/coins-stacked.svg?react";
import PaintRollerIcon from "@/assets/icons/paint-roller.svg?react";
import BulgariaFlagIcon from "@/assets/icons/flag-bulgaria.svg?react";
import USAFlagIcon from "@/assets/icons/flag-usa.svg?react";
import EUFlagIcon from "@/assets/icons/flag-eu.svg?react";
import UKFlagIcon from "@/assets/icons/flag-uk.svg?react";
import CheckIcon from "@/assets/icons/check.svg?react";
import EyeIcon from "@/assets/icons/eye.svg?react";

// Wallet
import TrashCanIcon from "@/assets/icons/trash-can.svg?react";

// Settings
import AtSignIcon from "@/assets/icons/at-sign.svg?react";

// Categories
import ShoppingCartIcon from "@/assets/icons/shopping-cart.svg?react";
import ShoppingBagIcon from "@/assets/icons/shopping-bag.svg?react";
import BusIcon from "@/assets/icons/bus.svg?react";
import PlaneIcon from "@/assets/icons/plane.svg?react";
import MasksTheaterIcon from "@/assets/icons/masks-theater.svg?react";
import UtensilsIcon from "@/assets/icons/utensils.svg?react";
import HeartPulseIcon from "@/assets/icons/heart-pulse.svg?react";
import FamilyGroupIcon from "@/assets/icons/family-group.svg?react";
import MoneyBillIcon from "@/assets/icons/money-bill.svg?react";
import GraduationCapIcon from "@/assets/icons/graduation-cap.svg?react";
import FootballIcon from "@/assets/icons/football.svg?react";
import BriefcaseIcon from "@/assets/icons/briefcase.svg?react";
import PiggyBankIcon from "@/assets/icons/piggy-bank.svg?react";
import MoneyBillStockUpIcon from "@/assets/icons/money-bill-stock-up.svg?react";
import ClipboardQuestionIcon from "@/assets/icons/clipboard-question.svg?react";
import MortgageIcon from "@/assets/icons/house-circle-check.svg?react";


const iconComponentsMap = {
  "wallet": WalletIcon,
  "categories": CategoriesIcon,
  "calendar": CalendarIcon,
  "shopping-cart": ShoppingCartIcon,
  "shopping-bag": ShoppingBagIcon,
  "house": HouseIcon,
  "bus": BusIcon,
  "masks-theater": MasksTheaterIcon,
  "utensils": UtensilsIcon,
  "heart-pulse": HeartPulseIcon,
  "family-group": FamilyGroupIcon,
  "money-bill": MoneyBillIcon,
  "graduation-cap": GraduationCapIcon,
  "football": FootballIcon,
  "briefcase": BriefcaseIcon,
  "piggy-bank": PiggyBankIcon,
  "money-bill-stock-up": MoneyBillStockUpIcon,
  "scale": ScaleIcon,
  "clipboard-question": ClipboardQuestionIcon,
  "hamburger": HamburgerIcon,
  "user-circle": UserIcon,
  "stats": StatsIcon,
  "settings": SettingsIcon,
  "logout": LogOutIcon,
  "plane": PlaneIcon,
  "mortgage": MortgageIcon,
  "history": HistoryIcon,
  "calendar-months": CalendarMonthsIcon,
  "stacked-coins": StackedCoinsIcon,
  "filter": FilterIcon,
  "arrows-rotate": ArrowsRotateIcon,
  "arrow-up": ArrowUpIcon,
  "arrow-down": ArrowDownIcon,
  "angles-left": AnglesLeftIcon,
  "angles-right": AnglesRightIcon,
  "heading": HeadingIcon,
  "coins-stacked": CoinsStackedIcon,
  "paint-roller": PaintRollerIcon,
  "flag-bulgaria": BulgariaFlagIcon,
  "flag-usa": USAFlagIcon,
  "flag-eu": EUFlagIcon,
  "flag-uk": UKFlagIcon,
  "check": CheckIcon,
  "eye": EyeIcon,
  "trash-can": TrashCanIcon,
  "at-sign": AtSignIcon,
}

export default function SvgIcon({ iconName, ...props }) {
  const IconComponent = iconComponentsMap[iconName];

  return IconComponent
    ? <IconComponent {...props} />
    : <div {...props}></div>
}