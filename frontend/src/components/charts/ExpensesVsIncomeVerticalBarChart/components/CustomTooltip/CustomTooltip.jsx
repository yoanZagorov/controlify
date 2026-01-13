import cn from 'classnames'

import { Amount } from '#/components/Amount'

export default function CustomTooltip({ active, payload, currency }) {
  if (active && payload && payload.length) {
    const amount = payload[0].value
    const isExpense = payload[0].payload.name === 'expense'

    return (
      <p className="rounded-lg bg-gray-medium p-2.5 text-sm font-bold text-gray-dark">
        Amount:{' '}
        <Amount
          amount={amount}
          currency={currency}
          className={cn(
            'font-semibold',
            isExpense ? 'text-red-dark' : 'text-green-dark',
          )}
        />
      </p>
    )
  }

  return null
}
