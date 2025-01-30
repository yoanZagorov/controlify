import lowercase from "./lowercase";

export default function lowercaseEveryWord(str) {
  const wordsArr = str.split(" ");
  const formattedWords = wordsArr.map(word => lowercase(word));

  return formattedWords.join(" ");
}