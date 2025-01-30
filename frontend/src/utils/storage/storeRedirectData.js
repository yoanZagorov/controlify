export default function storeRedirectData(msg, msgType, pathname = "") {
  const redirectData = {
    msg,
    msgType,
    originalPath: pathname,
  }

  localStorage.setItem("redirectData", JSON.stringify(redirectData));
}