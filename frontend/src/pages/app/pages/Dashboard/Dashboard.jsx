import cn from 'classnames'
import { useRouteLoaderData } from 'react-router'

import { ROUTES } from '#/constants'
import { useLayout, useScrollToTop } from '#/hooks'
import { TransactionProvider, WalletSubmissionProvider } from '#/contexts'
import { TransactionsSection } from '#/components/sections/TransactionsSection'
import { WalletsSection } from '#/components/sections/WalletsSection'

import { BalanceSection } from './sections/BalanceSection'

// Rendered on /dashboard
export default function Dashboard() {
  useScrollToTop()

  const {
    userData: {
      currency,
      wallets,
      balance,
      todayTransactions,
      balanceOverTimeChartData,
    },
  } = useRouteLoaderData('app')

  const { isSingleColLayout } = useLayout()

  return (
    <>
      <div
        className={cn(
          'grid gap-16 ll:gap-x-20 fhd:gap-x-24',
          !isSingleColLayout && 'grid-flow-col grid-cols-12 gap-x-12',
        )}
      >
        <BalanceSection
          sectionClassName={cn(!isSingleColLayout && 'col-span-6')}
          balance={{
            amount: balance,
            chartData: balanceOverTimeChartData,
          }}
          currency={currency}
        />

        <WalletSubmissionProvider>
          <WalletsSection
            action={ROUTES.DASHBOARD}
            contentProps={{
              wallets,
              section: {
                title: 'Wallets',
                className: cn(!isSingleColLayout && 'col-span-6'),
              },
            }}
          />
        </WalletSubmissionProvider>

        <TransactionProvider>
          <TransactionsSection
            action={ROUTES.DASHBOARD}
            contentProps={{
              hasFilter: false,
              transactions: todayTransactions,
              period: 'today',
              sectionProps: {
                title: 'Transactions',
                className: cn(
                  'h-full flex flex-col',
                  !isSingleColLayout && 'col-span-6 row-span-2',
                ),
                contentClassName: 'flex-1',
              },
              widget: {
                iconName: 'calendar',
                title: 'today',
              },
              display: {
                date: false,
              },
            }}
          />
        </TransactionProvider>
      </div>
    </>
  )
}
