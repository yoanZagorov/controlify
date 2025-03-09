// A clever trick to get the number of days in a month
// Setting the month to the next month and the date to 0 automatically gets the last day of the previous month
export default function getNumDaysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}