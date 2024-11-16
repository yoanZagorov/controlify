import { Timestamp } from "firebase/firestore";

export default function getLastThirtyDaysStartandEnd() {
  const end = new Date();
  end.setDate(end.getDate() - 1);
  end.setHours(23, 59, 59, 999);

  const start = new Date();
  start.setDate(end.getDate() - 30);
  start.setHours(0, 0, 0, 0);

  return {
    start: Timestamp.fromDate(start),
    end: Timestamp.fromDate(end)
  };
}