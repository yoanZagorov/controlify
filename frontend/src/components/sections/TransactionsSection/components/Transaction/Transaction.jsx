import cn from "classnames";
import { useEffect, useState } from "react";
import { useFetcher } from "react-router";

import { useBreakpoint, useModal, useTransaction } from "@/hooks";
import { formatEntityName } from "@/utils/formatting";
import { formatDateLong, formatDateShort } from "@/utils/date";

import { Amount } from "@/components/Amount";
import { SvgIcon } from "@/components/SvgIcon";
import { TransactionContainer } from "@/components/containers/TransactionContainer";

export default function Transaction({ action, isExpanded, transaction: { category, wallet, date, amount }, display }) {
  const { transactionData, defaultTransactionData, resetTransactionData } = useTransaction();
  const { amount: transactionDataAmount } = transactionData;

  const fetcher = useFetcher({ key: "updateTransaction" });
  const modal = useModal({ fetcher });

  const { modalState: [isModalOpen, setModalOpen] } = modal;

  const { isMobileS, isMobileM } = useBreakpoint();
  const isSpaceLimited = isMobileS || isMobileM;

  // To do: Create a more sophisticated function to compare complex data types
  const [hasTransactionDataChanged, setHasTransactionDataChanged] = useState(JSON.stringify(transactionData) === JSON.stringify(defaultTransactionData))

  useEffect(() => {
    if (JSON.stringify(transactionData) === JSON.stringify(defaultTransactionData)) {
      setHasTransactionDataChanged(false);
    } else {
      setHasTransactionDataChanged(true);
    }
  }, [transactionData]);

  const isWalletActive = wallet.deletedAt === null;

  const classes = {
    transaction: cn(
      "w-full grid items-center bg-gray-light rounded-lg overflow-auto",
      isExpanded ? "grid-cols-3 p-4" : "grid-cols-[minmax(auto,max-content)_1fr] gap-6 p-3"
    ),
    iconWrapper: cn(
      "flex justify-center items-center rounded-full",
      isSpaceLimited
        ? "min-h-8 min-w-8 max-h-8 max-w-8" // ensure icon keeps its shape
        : isExpanded ? "size-12" : "size-10",
    ),
    categoryName: cn(
      "text-gray-dark font-semibold",
      isSpaceLimited
        ? "text-sm"
        : isExpanded ? "text-lg" : "text-base"
    ),
    walletWrapper: cn(
      "flex items-center gap-1.5 font-bold",
      !isWalletActive && "opacity-50"
    ),
    amount: cn(
      "text-right font-semibold",
      isSpaceLimited
        ? "text-sm"
        : isExpanded ? "text-lg" : "text-base"
    )
  }

  const formattedCategoryName = formatEntityName(category.name);
  const formattedWalletName = formatEntityName(wallet.name);
  const formattedDate = isSpaceLimited
    ? formatDateShort(new Date(date))
    : formatDateLong(new Date(date));

  const correctSignAmount = category.type === "expense" ? -amount : amount;


  return (
    <TransactionContainer
      fetcher={fetcher}
      modal={modal}
      action={action}
      submitBtn={{
        text: "update transaction",
        props: {
          value: "updateTransaction",
          disabled: transactionDataAmount === "0" || !hasTransactionDataChanged
        }
      }}
      isDeleteBtn={true}
    >
      <button className={classes.transaction} onClick={() => setModalOpen(true)}>
        <div className={`flex items-center ${isExpanded ? "gap-4" : "gap-2.5"}`}>
          <div className={classes.iconWrapper} style={{ backgroundColor: category.color }}>
            <SvgIcon iconName={category.iconName} className="size-1/2 fill-gray-light" />
          </div>

          <div className="flex flex-col items-start">
            <span className={classes.categoryName}>{formattedCategoryName}</span>
            {display.wallet &&
              <div className={classes.walletWrapper} style={{ color: wallet.color }}>
                <SvgIcon iconName={wallet.iconName} className="size-3 min-w-3 min-h-3 fill-current" />
                <span className="text-left text-xs lm:text-sm">{formattedWalletName}</span>
              </div>
            }
            {(display.date && !isExpanded) &&
              <time className="mt-1 text-xs text-gray-dark opacity-50 font-bold">{formattedDate}</time>
            }
          </div>
        </div>

        {(display.date && isExpanded) && <time className="text-left text-base text-gray-dark opacity-50 font-bold">{formattedDate}</time>}

        <Amount
          amount={correctSignAmount}
          currency={wallet.currency}
          colorContext="light"
          displayPlusSign
          className={classes.amount}
        />
      </button>
    </TransactionContainer>

  )
}