export default function handleWalletNameInputChange({ value, updateState }) {
  const regex = /^[a-zA-Z0-9 _.-]+$/;

  if (value === "") updateState({ name: value })

  if (value.length > 30) return;

  if (regex.test(value)) updateState({ name: value });
}