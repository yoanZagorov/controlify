import { monthsMap } from "./maps";

export default function formatDateForCalendar(dateObj) {
  const day = dateObj.getDate();
  const month = monthsMap[dateObj.getMonth()];
  const year = dateObj.getFullYear();

  return `${month} ${day}, ${year}`
}