import capitalize from "./capitalize.js";

export default function capitalizeEveryWord(phrase) {
  const phraseArr = phrase.split(" ");
  const phraseArrCapitalized = phraseArr.map(word => capitalize(word));

  return phraseArrCapitalized.join(" ");
}