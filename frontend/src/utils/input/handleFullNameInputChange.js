export default function handleFullNameInputChange({ value, updateState }) {
  const regex = /^[a-zA-Z -]+$/;

  if (value === "") updateState({ fullName: value })

  if (value.length > 50) return;

  if (regex.test(value)) updateState({ fullName: value });
}