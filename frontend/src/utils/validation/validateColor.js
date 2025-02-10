import { VALIDATION_RULES } from "@/constants";
import { ValidationError } from "../errors";
import { isArrayTruthy } from "../array";

export default function validateColor(color, supportedColors = []) {
  if (!color) {
    throw new ValidationError("Color should not be empty");
  }

  if (!VALIDATION_RULES.HEX_COLOR_CODE_REGEX.test(color)) {
    throw new ValidationError("Color should be in a valid hex code format (e.g. #FFFFFF or #FFF). Please try again");
  }

  if (isArrayTruthy(supportedColors) && !supportedColors.includes(color)) {
    throw new ValidationError("Color is not part of the supported colors for this entity. Please try with another one");
  }
}