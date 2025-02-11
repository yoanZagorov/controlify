// The purpose is to check if the year, month and day of the two dates are equal, NOT taking into account the h, m, s and ms
// If you want to perform the contrary checks (e.g. < and <=), just flip the arguments
export default function compareDatesByDay(firstDayDate, secondDayDate, operator = "===") {
  const firstDayDateData = {
    year: firstDayDate.getFullYear(),
    month: firstDayDate.getMonth(),
    date: firstDayDate.getDate()
  }

  const secondDayDateData = {
    year: secondDayDate.getFullYear(),
    month: secondDayDate.getMonth(),
    date: secondDayDate.getDate()
  }

  if (operator === "===") {
    const areDatesEqual =
      firstDayDateData.year === secondDayDateData.year &&
      firstDayDateData.month === secondDayDateData.month &&
      firstDayDateData.date === secondDayDateData.date;

    return areDatesEqual;
  } else if (operator === ">") {
    const isFirstDateGreaterThanSecond =
      firstDayDateData.year > secondDayDateData.year ||
      (firstDayDateData.year >= secondDayDateData.year && firstDayDateData.month > secondDayDateData.month) ||
      (firstDayDateData.year >= secondDayDateData.year && firstDayDateData.month >= secondDayDateData.month && firstDayDateData.date > secondDayDateData.date);

    return isFirstDateGreaterThanSecond;
  } else if (operator === ">=") {
    const isFirstDateGreaterThanOrEqualToSecond =
      firstDayDateData.year >= secondDayDateData.year ||
      (firstDayDateData.year >= secondDayDateData.year && firstDayDateData.month >= secondDayDateData.month) ||
      (firstDayDateData.year >= secondDayDateData.year && firstDayDateData.month >= secondDayDateData.month && firstDayDateData.date >= secondDayDateData.date);

    return isFirstDateGreaterThanOrEqualToSecond;
  }
}
