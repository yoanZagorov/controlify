import Section from "@/components/sections/Section/Section";
import { ContentWidget } from "@/components/widgets/ContentWidget";
import { Transaction } from "./components/Transaction";
import { Button } from "@/components/Button";
import { Notification } from "@/components/Notification";

export default function CompactTransactionsSection({ sectionClassName, widget, openModal, transactions, period }) {
  const hasTransactions = transactions.length > 0;

  const transactionEls = hasTransactions &&
    transactions.map(transaction => (
      <li key={transaction.id}>
        <Transaction
          category={transaction.category}
          wallet={transaction.wallet}
          amount={transaction.amount}
          currency={transaction.wallet.currency}
        />
      </li>
    ));

  return (
    <Section title="Transactions" className={sectionClassName} contentClassName="flex-1">
      <ContentWidget
        iconName={widget.iconName}
        title={widget.title}
        className="h-full"
        content={{ className: "flex-1" }}
      >
        <div className="mx-auto flex flex-col gap-8">
          {hasTransactions ? (
            <ul className="flex flex-col gap-5">
              {transactionEls}
            </ul>
          ) : (
            <Notification msgType="notification" className="self-center w-full max-w-80">
              Oops... It looks like you haven't made any transactions yet{period === "today" && " today"}. Add one now!
            </Notification>
          )}

          <Button onClick={openModal} className="self-center w-full max-w-64 lm:py-3 lm:text-lg focus-visible:ring-4">
            Add Transaction
          </Button>
        </div>
      </ContentWidget>
    </Section>
  )
}
