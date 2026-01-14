export default function getCurrentPage(pathname) {
  const pageArr = pathname.split('/')
  const page = pageArr[pageArr.length - 1]
  return page
}
