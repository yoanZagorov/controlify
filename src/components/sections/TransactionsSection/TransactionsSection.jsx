import Section from "@/components/sections/Section/Section";
import { ContentWidget } from "@/components/widgets/ContentWidget";
import { Transaction } from "./components/Transaction";
import { Button } from "@/components/Button";
import { Notification } from "@/components/Notification";
import { SvgIcon } from "@/components/SvgIcon";
import cn from "classnames";

export default function TransactionsSection({ transactionType = "compact", hasFilter = true, section, widget, openModal, transactions, period, showDate = true }) {
  const hasTransactions = transactions.length > 0;
  const isExpanded = transactionType === "expanded";

  const transactionEls = hasTransactions ?
    transactions.map(transaction => (
      <li key={transaction.id}>
        <Transaction
          isExpanded={isExpanded}
          transaction={transaction}
          showDate={showDate}
        />
      </li>
    )) : null;

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

        <Button onClick={openModal} className={classes.openModalBtn}>
          Add Transaction
        </Button>

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
  )
}
