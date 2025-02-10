export default function lowercaseEveryWord(str) {
  const wordsArr = str.split(" ");
  const formattedWords = wordsArr.map(word => word.toLowerCase());

  return formattedWords.join(" ");
}