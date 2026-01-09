import { LOCAL_STORAGE } from "#constants";
import getStoredData from "./getStoredData";

export default function getStoredRedirectData() {
  return getStoredData(LOCAL_STORAGE.KEYS.REDIRECT_DATA);
}