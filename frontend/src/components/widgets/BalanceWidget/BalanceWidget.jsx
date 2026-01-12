import cn from 'classnames'

import { ContentWidget } from '../ContentWidget'
import { Amount } from '#/components/Amount'
import { SvgIcon } from '#/components/SvgIcon'

// Displays the balance of the entity
export default function BalanceWidget({
  iconName,
  title,
  amount,
  currency,
  balanceChange,
  className,
}) {
  const isBalanceChangePositive = balanceChange >= 0

  return (
    <ContentWidget
      iconName={iconName}
      className={cn(balanceChange !== undefined && 'relative', className)}
      title={title}
      content={{ hasBackground: false, className: 'mt-3' }}
    >
      <Amount
        amount={amount}
        currency={currency}
        colorContext="light"
        className="text-2xl font-bold"
      />

      {/* Display balance change if provided */}
      {balanceChange !== undefined && (
        <div className="absolute top-4 right-4 flex items-center gap-2 py-1.5 px-2 rounded font-bold bg-gray-light">
          {isBalanceChangePositive ? (
            <SvgIcon iconName="arrow-up" className="size-3.5 fill-green-dark" />
          ) : (
            <SvgIcon iconName="arrow-down" className="size-3.5 fill-red-dark" />
          )}
          <Amount
            amount={balanceChange}
            currency={currency}
            colorContext="light"
            displayPlusSign
            className="text-xs"
          />
        </div>
      )}
    </ContentWidget>
  )
}
