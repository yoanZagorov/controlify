import { useEffect } from 'react'
import { useFetcher } from 'react-router'

import { resetFetcher } from '#/services/router/utils'
import { TransactionProvider } from '#/contexts'
import { isArrayTruthy } from '#/utils/array'
import { Section } from '#/components/sections/Section'
import { ContentWidget } from '#/components/widgets/ContentWidget'
import { Notification } from '#/components/Notification'
import { Button } from '#/components/Button'

import { TransactionItem } from '../TransactionItem'

// Handles the UI display for the TransactionSection
export default function TransactionsSectionContent({
  type = 'compact',
  hasFilter = true,
  period = 'allTime',
  sectionProps,
  widget,
  display,
  transactions,
  action,
  openModal,
}) {
  const hasTransactions = isArrayTruthy(transactions)
  const isExpanded = type === 'expanded'
  const displayConfig = { date: true, wallet: true, ...display }

  const fetcher = useFetcher({ key: 'updateTransaction' })

  // Manual cleanup for last transaction - needed to properly close the modal
  useEffect(() => {
    if (!hasTransactions) {
      resetFetcher(fetcher)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [hasTransactions])

  const transactionEls = hasTransactions
    ? transactions.map((transaction) => {
        const { id, amount, type, currency, wallet, category, date } =
          transaction

        return (
          <li key={id} data-actionable="true">
            <TransactionProvider
              providedTransactionData={{
                amount: amount.toString(),
                category: {
                  id: category.id,
                  name: category.name,
                },
                type,
                currency,
                date: new Date(date),
                transactionId: transaction.id,
              }}
              providedWallet={{
                id: wallet.id,
                name: wallet.name,
              }}
            >
              <TransactionItem
                action={action}
                isExpanded={isExpanded}
                transaction={transaction}
                display={displayConfig}
              />
            </TransactionProvider>
          </li>
        )
      })
    : null

  return (
    <>
      <Section {...sectionProps}>
        <ContentWidget
          iconName={widget.iconName}
          title={widget.title}
          className="relative h-full"
          content={{
            hasBackground: false,
            className: 'mt-4 flex flex-col gap-8',
          }}
        >
          {hasTransactions ? (
            <ul className={`flex flex-col ${isExpanded ? 'gap-7' : 'gap-5'}`}>
              {transactionEls}
            </ul>
          ) : (
            <Notification
              msgType="notification"
              className="w-full max-w-80 self-center"
            >
              Oops... It looks like you haven't made any transactions yet
              {period === 'today' && ' today'}. Add one now!
            </Notification>
          )}

          <Button
            size={isExpanded ? 'l' : 'm'}
            onClick={openModal}
            className="w-full max-w-64 self-center focus-visible:ring-4"
            data-actionable="true"
          >
            add transaction
          </Button>

          {/* To do: Implement filtering functionality */}
          {/* {hasFilter && (
            <button
              onClick={() => console.log("Filtering...")}
              className={cn(
                "absolute top-4 right-4 flex justify-center items-center bg-gray-light border border-gray-dark",
                isExpanded ? "p-2 rounded-md gap-3" : "size-9 rounded-full"
              )}
            >
              <SvgIcon iconName="filter" className="size-5 fill-gray-dark" />
              {isExpanded && <span className="text-gray-dark font-semibold">Filter</span>}
            </button>
          )} */}
        </ContentWidget>
      </Section>
    </>
  )
}
