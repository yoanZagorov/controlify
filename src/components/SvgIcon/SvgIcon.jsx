// Dashboard
import ScaleIcon from "@/assets/icons/scale.svg?react";
import WalletIcon from "@/assets/icons/wallet.svg?react";
import CalendarIcon from "@/assets/icons/calendar.svg?react";

// Transaction Modal
import CategoriesIcon from "@/assets/icons/categories.svg?react";

// Categories
import ShoppingCartIcon from "@/assets/icons/shopping-cart.svg?react";
import ShoppingBagIcon from "@/assets/icons/shopping-bag.svg?react";
import HouseIcon from "@/assets/icons/house.svg?react";
import BusIcon from "@/assets/icons/bus.svg?react";
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
}

export default function SvgIcon({ iconName, ...props }) {
  const IconComponent = iconComponentsMap[iconName];

  return IconComponent
    ? <IconComponent {...props} />
    : <div {...props}></div>
}