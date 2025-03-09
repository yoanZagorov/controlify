import { LOCAL_STORAGE } from "@/constants";

// Store flash msg data to display on the next page after a redirect
export default function storeRedirectData(msg, msgType, pathname = "") {
  const redirectData = {
    msg,
    msgType,
    originalPath: pathname,
  }

  localStorage.setItem(LOCAL_STORAGE.KEYS.REDIRECT_DATA, JSON.stringify(redirectData));
}