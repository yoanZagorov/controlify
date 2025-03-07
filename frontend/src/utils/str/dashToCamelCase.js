import capitalize from "./capitalize.js";

export default function dashToCamelCase(str) {
  return str.split("-")
    .map((word, index) => index === 0 ? word : capitalize(word))
    .join("")
}
