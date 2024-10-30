export default function handleAmountInput(e, amount, setAmount) {
  const value = e.target.value;

  const regex = /^\d{1,7}(?:\.\d{1,2})?$/;

  if (value === "") {
    setAmount("0");
  }

  if (amount === "0" && /^0[1-9]$/.test(value)) {
    setAmount(value.replace("0", ""));
    return;
  }

  if (regex.test(value)) {
    setAmount(value);
  }
}