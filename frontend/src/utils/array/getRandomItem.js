import getRandomIndex from "../general/getRandomIndex";

export default function getRandomItem(arr) {
  return arr[getRandomIndex(arr)];
}