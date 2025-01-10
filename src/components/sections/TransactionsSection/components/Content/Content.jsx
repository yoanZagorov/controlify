import cn from "classnames";

import { TransactionProvider } from "@/contexts";

import { Section } from "@/components/sections/Section";
import { ContentWidget } from "@/components/widgets/ContentWidget";
import { Notification } from "@/components/Notification";
import { Button } from "@/components/Button";
import { SvgIcon } from "@/components/SvgIcon";
import { Transaction } from "../Transaction";

export default function Content({ type = "compact", hasFilter = true, period = "all-time", section, widget, display, transactions, openModal }) {
  const hasTransactions = transactions.length > 0;
  const isExpanded = type === "expanded";
  const displayConfig = { date: true, wallet: true, ...display };

  const transactionEls = hasTransactions ?
    transactions.map(transaction => {
      const { amount, wallet, category, date } = transaction;

      return (
        <li key={transaction.id}>
          <TransactionProvider
            prepopulatedTransactionData={{
              amount: String(amount),
              currency: wallet.currency,
              category: {
                id: category.id,
                name: category.name,
                type: category.type
              },
              date: new Date(date),
              transactionId: transaction.id
            }}
            wallet={{
              id: wallet.id,
              name: wallet.name,
            }}
          >
            <Transaction
              isExpanded={isExpanded}
              transaction={transaction}
              display={displayConfig}
            />
          </TransactionProvider>
        </li >
      )
    }) : null;

  const classes = {
    openModalBtn: cn(
      "self-center w-full max-w-64 focus-visible:ring-4",
      isExpanded && "py-3 text-xl"
    ),
    filterBtn: cn(
      "absolute top-4 right-4 flex justify-center items-center bg-gray-light border border-gray-dark",
      isExpanded ? "p-2 rounded-md gap-3" : "size-9 rounded-full"
    )
  }

  return (
    <>
      <Section title={section.title} className={section.className} contentClassName={section.contentClassName}>
        <ContentWidget
          iconName={widget.iconName}
          title={widget.title}
          className="relative h-full"
          content={{ hasBackground: false, className: "mt-4 flex flex-col gap-8" }}
        >
          {hasTransactions ? (
            <ul className={`flex flex-col ${isExpanded ? "gap-7" : "gap-5"}`}>
              {transactionEls}
            </ul>
          ) : (
            <Notification msgType="notification" className="self-center w-full max-w-80">
              Oops... It looks like you haven't made any transactions yet{period === "today" && " today"}. Add one now!
            </Notification>
          )}

          <Button onClick={openModal} className={classes.openModalBtn} data-actionable="true">
            Add Transaction
          </Button>


          {/* <Button type="submit" size="s" colorPalette="secondaryDary">
            Load More
          </Button> */}

          {hasFilter && (
            <button
              onClick={() => console.log("Filtering...")}
              className={classes.filterBtn}
            >
              <SvgIcon iconName="filter" className="size-5 fill-gray-dark" />
              {isExpanded && <span className="text-gray-dark font-semibold">Filter</span>}
            </button>
          )}
        </ContentWidget>
      </Section>
    </>
  )
}