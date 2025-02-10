import { VALIDATION_RULES } from "@/constants";

export default function handleWalletNameInputChange({ value, updateState }) {
  if (value === "") updateState({ name: value })

  if (value.length > VALIDATION_RULES.WALLET.NAME.MAX_LENGTH) return;

  if (VALIDATION_RULES.WALLET.NAME.CLIENT_REGEX.test(value)) updateState({ name: value });
}