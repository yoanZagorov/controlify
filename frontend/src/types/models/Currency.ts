import type { CURRENCY_CODES, ICON_NAMES } from '#/constants'

export default interface Currency {
  code: (typeof CURRENCY_CODES)[number]
  conversionRate: number
  iconName: (typeof ICON_NAMES.CURRENCIES)[number]
  isBase: boolean
}
