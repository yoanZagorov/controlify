import { monthsMap } from "./maps";

export default function getDay(dayP) {
  const date = new Date();

  let day = date.getDate();
  dayP === "yesterday" && day--;

  const month = monthsMap[date.getMonth()];
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}