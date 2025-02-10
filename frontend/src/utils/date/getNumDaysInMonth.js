export default function getNumDaysInMonth(month, year) {
  // A clever trick to get the days of the month
  // Setting the month to the next month and the date to 0 automatically gets the last day of the previous month
  return new Date(year, month + 1, 0).getDate();
}