export default function compareDatesByDay(firstDayDate, secondDayDate) {
  const tempFirst = new Date(firstDayDate);
  tempFirst.setHours(0);
  tempFirst.setMinutes(0);
  tempFirst.setSeconds(0);
  tempFirst.setMilliseconds(0);

  const tempSecond = new Date(secondDayDate);
  tempSecond.setHours(0);
  tempSecond.setMinutes(0);
  tempSecond.setSeconds(0);
  tempSecond.setMilliseconds(0);

  return tempFirst.getTime() === tempSecond.getTime();
}