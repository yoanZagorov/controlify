import { getLastThirtyDaysStartandEnd } from "@/utils/date";

export default function getPeriodInfo(period = "lastThirtyDays") {
  let start, end, periodLength;

  switch (period) {
    case "lastThirtyDays":
      ({ start, end } = getLastThirtyDaysStartandEnd());
      periodLength = 30;
      break;
  }

  return { start, end, periodLength };
}