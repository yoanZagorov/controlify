import { VALIDATION_RULES } from "@/constants";
import { ValidationError } from "../errors";

export default function validateWalletName(name) {
  if (!name) {
    throw new ValidationError("Wallet name should not be empty");
  }

  if (name.length < VALIDATION_RULES.WALLET.NAME.MIN_LENGTH) {
    throw new ValidationError(`Wallet name length should be greater than ${VALIDATION_RULES.WALLET.NAME.MIN_LENGTH - 1} characters. Please try with a longer one`);
  }

  if (name.length > VALIDATION_RULES.WALLET.NAME.MAX_LENGTH) {
    throw new ValidationError(`Wallet name length should be less than ${VALIDATION_RULES.WALLET.NAME.MAX_LENGTH + 1} characters. Please try with a shorter one`);
  }

  if (!VALIDATION_RULES.WALLET.NAME.REGEX.test(name)) {
    throw new ValidationError("Wallet name can only include letters, numbers, spaces, and - _ .");
  }

  const reservedWords = ["deleted, updated, system, all, none, deleted, archived, unknown, admin, root, user, account, balance, null, undefined, true, false, select, insert"];
  if (reservedWords.includes(name.toLowerCase())) {
    throw new ValidationError("Invalid name. Please choose another one");
  }
}