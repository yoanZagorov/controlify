import { COLORS } from "@/constants";
import validateAmount from "./validateAmount";
import validateCurrency from "./validateCurrency";
import validateWalletVisibleCategories from "./validateWalletVisibleCategories";
import validateColor from "./validateColor";

// Name already validated
export default function validateWalletData({ initialBalance = null, categories, color, supportedCurrencyCodes }) {
  // Initial balance validation
  // Relevant only for wallet submissions but not updates
  if (initialBalance !== null) {
    validateAmount(initialBalance, VALIDATION_RULES.WALLET.INITIAL_BALANCE.MIN_AMOUNT, VALIDATION_RULES.WALLET.INITIAL_BALANCE.MAX_AMOUNT, "initial balance");
  }

  // Currency validation
  validateCurrency(currency, supportedCurrencyCodes);

  // Categories validation
  validateWalletVisibleCategories(categories);

  // Color validation
  validateColor(color, COLORS.ENTITIES.WALLET_COLORS);
}