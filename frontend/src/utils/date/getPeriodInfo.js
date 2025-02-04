import { DEFAULT_PERIOD } from "@/constants";
import { getLastThirtyDaysStartandEnd } from "@/utils/date";

export default function getPeriodInfo(period = DEFAULT_PERIOD) {
  let start, end, periodLength;

  switch (period) {
    case "lastThirtyDays":
      ({ start, end } = getLastThirtyDaysStartandEnd());
      periodLength = 30;
      break;
  }

  return { start, end, periodLength };
}