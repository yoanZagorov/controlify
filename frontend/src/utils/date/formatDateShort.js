export default function formatDateShort(dayObj) {
  const day = dayObj.getDate()
  const month = dayObj.getMonth() + 1
  const year = dayObj.getFullYear()

  return `${day}/${month}/${year}`
}
