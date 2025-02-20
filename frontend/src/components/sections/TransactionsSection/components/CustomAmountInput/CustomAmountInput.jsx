import { useRef } from "react";
import cn from "classnames"
import { useAutoFocus, useBreakpoint } from "@/hooks";
import { VALIDATION_RULES } from "@/constants";

export default function CustomAmountInput({ isExpense, currency, isDeleteBtn = false, ...inputProps }) {
  const amountInputRef = useRef(null);
  const { isMobile } = useBreakpoint();
  !isMobile && useAutoFocus({ ref: amountInputRef }); // On mobile it doesn't look well since the keyboard hides half of the screen

  const isUsingKeyboard = document.body.classList.contains("using-keyboard");

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
              "rounded bg-transparent focus:outline-none",
              isDeleteBtn ? "w-[60%]" : "w-full",
              isUsingKeyboard && "focus-visible-goldenrod"
            )}
            {...inputProps}
          />
        </span>
      </div>
    </>
  )
}