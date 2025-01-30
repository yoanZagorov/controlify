export default function getNumDaysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}