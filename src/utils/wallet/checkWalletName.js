import { ValidationError } from "../errors";

export default function checkWalletName(untrimmedName) {
  const nameRegex = /^[a-zA-Z0-9 _-]+$/;

  const reservedWords = ["deleted, updated, system, all, none, deleted, archived, unknown, admin, root, user, account, balance, null, undefined, true, false, select, insert,"];

  const name = untrimmedName.trim();

  if (!name) {
    throw new ValidationError("Wallet name should not be empty");
  }

  if (name.length <= 2) {
    throw new ValidationError("Wallet name length should be greater than 2 characters");
  }

  if (name.length >= 30) {
    throw new ValidationError("Wallet name length should be less than 30 characters");
  }

  if (!nameRegex.test(name)) {
    throw new ValidationError("Wallet name can only include letters, numbers, spaces, and - _ .");
  }

  if (reservedWords.includes(name.toLowerCase())) {
    throw new ValidationError("Invalid name. Please choose another one");
  }
}