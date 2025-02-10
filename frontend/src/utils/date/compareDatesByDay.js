// The purpose is to check if the year, month and day of the two dates are equal, NOT taking into account the h, m, s and ms
export default function compareDatesByDay(firstDayDate, secondDayDate) {
  const areDatesEqual =
    firstDayDate.getFullYear() === secondDayDate.getFullYear() &&
    firstDayDate.getMonth() === secondDayDate.getMonth() &&
    firstDayDate.getDate() === secondDayDate.getDate();

  return areDatesEqual;
}
