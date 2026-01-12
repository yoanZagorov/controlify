import { PERIODS } from '#/constants'
import { getLastThirtyDaysStartandEnd } from '#/utils/date'
import { dashToCamelCase } from '../str'

export default function getPeriodInfo(
  period = dashToCamelCase(PERIODS.DEFAULT_PERIOD),
) {
  let start, end, periodLength

  switch (period) {
    case 'lastThirtyDays':
      ;({ start, end } = getLastThirtyDaysStartandEnd())
      periodLength = 30
      break
  }

  return { timeframe: period, start, end, periodLength }
}
