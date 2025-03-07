import { capitalizeEveryWord, dashToSpace } from "../str/index.js";

export default function formatPeriodNameForUI(periodName) {
  const entityNameNoDashes = dashToSpace(periodName);
  const formattedEntityName = capitalizeEveryWord(entityNameNoDashes);

  switch (formattedEntityName) {
    case ("Last Thirty Days"):
      return "Last 30 Days";
    default:
      return formattedEntityName;
  }
}
