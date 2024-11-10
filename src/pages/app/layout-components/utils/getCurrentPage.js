export default function getCurrentPage(pathname) {
  const page = pathname.split("/app/")[1] || "dashboard";
  return page;
}