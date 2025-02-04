// Get all the days that should participate in the calculation (inclusive)
export default function getLastThirtyDaysStartandEnd() {
  const end = new Date();
  end.setDate(end.getDate() - 1);
  end.setHours(23, 59, 59, 999);

  const start = new Date(end);
  start.setDate(end.getDate() - 30 + 1);
  start.setHours(0, 0, 0, 0);

  return { start, end };
}