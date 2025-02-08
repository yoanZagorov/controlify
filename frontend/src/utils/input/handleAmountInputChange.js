// Guiding the user towards correct input
export default function handleAmountInputChange({ state, value }) {
  if (value === "") {
    state.updateState(state.prop ? { [state.prop]: "0" } : "0"); // Handling both simple and more complex states
    return;
  }

  // Ensures no leading zeros
  if (/^0\d{1,7}(?:\.\d{1,2})?$/.test(value)) {
    const updatedValue = value.replace("0", "");
    state.updateState(state.prop ? { [state.prop]: updatedValue } : updatedValue);
    return;
  }

  const regex = /^\d{1,7}(?:\.\d{1,2})?$/;
  if (regex.test(value)) {
    state.updateState(state.prop ? { [state.prop]: value } : value);
    return;
  }
}