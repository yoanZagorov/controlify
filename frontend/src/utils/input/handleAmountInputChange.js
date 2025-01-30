export default function handleAmountInputChange({ state, value }) {
  const regex = /^\d{1,7}(?:\.\d{1,2})?$/;

  if (value === "") {
    state.updateState(state.prop ? { [state.prop]: "0" } : "0");
    return;
  }

  if (state.value === "0" && /^0[0-9]$/.test(value)) {
    const updatedValue = value.replace("0", "")

    state.updateState(state.prop ? { [state.prop]: updatedValue } : updatedValue);
    return;
  }

  if (regex.test(value)) {
    state.updateState(state.prop ? { [state.prop]: value } : value);
    return;
  }
}