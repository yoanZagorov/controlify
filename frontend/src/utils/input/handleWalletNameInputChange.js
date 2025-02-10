import { VALIDATION_RULES } from "@/constants";

export default function handleWalletNameInputChange({ value, updateState }) {
  if (value === "" || VALIDATION_RULES.WALLET.NAME.CLIENT_REGEX.test(value)) {
    updateState({ name: value })
    return;
  };
}