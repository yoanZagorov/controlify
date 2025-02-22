import cn from "classnames";
import { useEffect, useMemo, useState } from "react";
import { useFetcher } from "react-router";

import { useBreakpoint, useModal, useTransaction } from "@/hooks";
import { formatEntityNameForUI } from "@/utils/formatting";
import { formatDateLong, formatDateShort } from "@/utils/date";

import { Amount } from "@/components/Amount";
import { SvgIcon } from "@/components/SvgIcon";
import { TransactionContainer } from "../TransactionContainer"

export default function TransactionItem({ action, isExpanded, transaction: { amount, currency, type, category, wallet, date }, display }) {
  const { transactionData, defaultTransactionData, resetTransactionData } = useTransaction();
  const { amount: amountInState } = transactionData;

  const fetcher = useFetcher({ key: "updateTransaction" });
  const modal = useModal({ fetcher });

  const { modalState: [isModalOpen, setModalOpen] } = modal;

  const { isMobileS, isMobileM } = useBreakpoint();
  const isSpaceLimited = isMobileS || isMobileM;

  // To do: (Non-MVP): Replace JSON.stringify() with a proper complex object deep compare function
  const hasTransactionDataChanged = useMemo(
    () => JSON.stringify(transactionData) !== JSON.stringify(defaultTransactionData),
    [transactionData]
  )

  const isWalletActive = wallet.deletedAt === null;

  const formattedCategoryName = formatEntityNameForUI(category.name);
  const formattedWalletName = formatEntityNameForUI(wallet.name);
  const formattedDate = isSpaceLimited
    ? formatDateShort(new Date(date))
    : formatDateLong(new Date(date));

  const correctSignAmount = type === "expense" ? -amount : amount;

  return (
    <TransactionContainer
      mode="edit"
      modal={modal}
      formProps={{ fetcher, action }}
      submitBtn={{
        text: "update transaction",
        props: {
          value: "updateTransaction",
          disabled: amountInState === "0" || !hasTransactionDataChanged
        }
      }}
    >
      <button
        className={cn(
          "w-full grid items-center bg-gray-light rounded-lg overflow-auto",
          isExpanded ? "grid-cols-3 p-4" : "grid-cols-[minmax(auto,max-content)_1fr] gap-6 p-3"
        )}
        onClick={() => setModalOpen(true)}
      >
        <div className={`flex items-center ${isExpanded ? "gap-4" : "gap-2.5"}`}>
          <div
            // ensure icon keeps its shape
            className={cn("flex justify-center items-center rounded-full", isSpaceLimited ? "min-h-8 min-w-8 max-h-8 max-w-8" : isExpanded ? "size-12" : "size-10")}
            style={{ backgroundColor: category.color }}
          >
            <SvgIcon iconName={category.iconName} className="size-1/2 fill-gray-light" />
          </div>

          <div className="flex flex-col items-start">
            <span className={cn("text-gray-dark font-semibold", isSpaceLimited ? "text-sm" : isExpanded ? "text-lg" : "text-base")}>
              {formattedCategoryName}
            </span>
            {display.wallet &&
              <div className={cn("flex items-center gap-1.5 font-bold", !isWalletActive && "opacity-50")} style={{ color: wallet.color }}>
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
          currency={currency}
          colorContext="light"
          displayPlusSign
          className={cn("text-right font-semibold", isSpaceLimited ? "text-sm" : isExpanded ? "text-lg" : "text-base")}
        />
      </button>
    </TransactionContainer>

  )
}