import { ValidationError } from "../errors";

export default function validateIconName(iconName, supportedIconNames) {
  if (!iconName) throw new ValidationError("Icon should not be empty. Please choose an icon");

  if (!supportedIconNames.includes(iconName)) {
    throw new ValidationError("Unsupported entity icon. Please choose another one");
  }
}