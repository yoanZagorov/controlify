export default function decapitalize(str) {
  return str[0].toLowerCase().concat(str.slice(1));
}