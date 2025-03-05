import { useRef } from "react";
import cn from "classnames"

import { VALIDATION_RULES } from "@/constants";

import { useAutoFocus } from "@/hooks";

export default function CustomAmountInput({ isEditTransaction = false, isExpense, currency, ...inputProps }) {
  const amountInputRef = useRef(null);
  !isEditTransaction && useAutoFocus({ ref: amountInputRef }); // Focusing directly, so users don't miss the input

  return (
    <>
      <div className="flex items-end gap-3">
        <label
          htmlFor="transactionAmount"
          className="text-gray-light text-2xl"
        >
          Amount:
        </label>

        <span className={cn("flex gap-2 items-end text-lg", isExpense ? "text-red-light" : "text-green-light")}>
          <span className="text-nowrap">{isExpense ? "-" : "+"}{currency}</span>
          <input
            ref={amountInputRef}
            required
            type="number"
            step={0.01}
            id="transactionAmount"
            min={VALIDATION_RULES.TRANSACTION.AMOUNT.MIN_AMOUNT}
            className={cn(
              "px-1 rounded bg-transparent focus-goldenrod", // Use focus in all instances, since users had problems finding the input
              isEditTransaction ? "w-[60%]" : "w-full",
            )}
            {...inputProps}
          />
        </span>
      </div>
    </>
  )
}