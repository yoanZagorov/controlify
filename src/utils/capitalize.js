export default function capitalize(str) {
  return str.slice(0, 1).toUpperCase().concat(str.slice(1));
}