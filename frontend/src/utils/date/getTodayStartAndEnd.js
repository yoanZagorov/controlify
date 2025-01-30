import { Timestamp } from "firebase/firestore";

export default function getTodayStartAndEnd() {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  return {
    start: Timestamp.fromDate(startOfToday), 
    end: Timestamp.fromDate(endOfToday), 
  }
}