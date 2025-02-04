import { LOCAL_STORAGE } from "@/constants";

export default function storeRedirectData(msg, msgType, pathname = "") {
  const redirectData = {
    msg,
    msgType,
    originalPath: pathname,
  }

  localStorage.setItem(LOCAL_STORAGE.KEYS.REDIRECT_DATA, JSON.stringify(redirectData));
}