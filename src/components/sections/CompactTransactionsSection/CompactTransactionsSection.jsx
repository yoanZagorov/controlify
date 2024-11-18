import Section from "@/components/sections/Section/Section";
import { ContentWidget } from "@/components/widgets/ContentWidget";
import { Transaction } from "./components/Transaction";
import { Button } from "@/components/Button";

export default function CompactTransactionsSection({ sectionClassName, widget, openModal, transactions }) {
  const hasTransactions = transactions.find(wallet => wallet.transactions.length > 0);

  const transactionEls = hasTransactions &&
    transactions.map(wallet => (
      wallet.transactions.map(transaction => (
        <li key={transaction.id}>
          <Transaction
            category={transaction.category}
            wallet={transaction.wallet}
            amount={transaction.amount}
            currency={transaction.wallet.currency}
          />
        </li>
      ))
    ));

  return (
    <Section title="Transactions" className={sectionClassName}>
      <ContentWidget iconName={widget.iconName} title={widget.title} className="mt-3 flex-1">
        <div className="mt-2 flex-1 p-3 rounded-lg bg-gray-light">
          <div className="mx-auto flex flex-col gap-8">
            {hasTransactions ? (
              <ul className="flex flex-col gap-5">
                {transactionEls}
              </ul>
            ) : (
              <p className="self-center w-full max-w-80 text-navy-dark text-center text-balance font-semibold">
                Oops... It looks like you haven't made any transactions yet today. Add one now!
              </p>
            )}

            <Button onClick={openModal} className="self-center w-full max-w-64 lm:py-3 lm:text-lg focus-visible:ring-4">
              Add Transaction
            </Button>
          </div>
        </div>
      </ContentWidget>
    </Section>
  )
}
