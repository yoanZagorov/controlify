import { compareDatesByDay, formatDateLong, getSpecificDay } from "@/utils/date";

export default function getDateBtnValue(date) {
  const today = getSpecificDay("today");
  const tomorrow = getSpecificDay("tomorrow");
  const yesterday = getSpecificDay("yesterday");

  if (compareDatesByDay(date, today)) {
    return "Today";
  } else if (compareDatesByDay(date, yesterday)) {
    return "Yesterday";
  } else if (compareDatesByDay(date, tomorrow)) {
    return "Tomorrow";
  } else {
    return formatDateLong(date);
  }
}