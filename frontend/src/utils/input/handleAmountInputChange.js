import { VALIDATION_RULES } from "#constants";

// Guiding the user towards correct input
export default function handleAmountInputChange({ state, value }) {
  if (value === "") {
    state.updateState(state.prop ? { [state.prop]: "0" } : "0"); // Handling both simple and more complex states
    return;
  }

  // Ensures no leading zeros
  if (VALIDATION_RULES.AMOUNT.LEADING_ZERO_REGEX.test(value)) {
    const updatedValue = value.replace("0", "");
    state.updateState(state.prop ? { [state.prop]: updatedValue } : updatedValue);
    return;
  }

  if (VALIDATION_RULES.AMOUNT.REGEX.test(value)) {
    state.updateState(state.prop ? { [state.prop]: value } : value);
    return;
  }
}