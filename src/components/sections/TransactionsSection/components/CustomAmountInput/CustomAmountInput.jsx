import { useRef } from "react";
import cn from "classnames"
import { useAutoFocus } from "@/hooks";

export default function CustomAmountInput({ value, handleChange, isExpense, currency }) {
  const amountInputRef = useRef(null);
  useAutoFocus({ ref: amountInputRef });

  const isUsingKeyboard = document.body.classList.contains("using-keyboard");

  const classes = {
    amountValue: cn(
      "flex gap-2 items-end text-xl",
      isExpense ? "text-red-light" : "text-green-light"
    ),
    amountInput: cn(
      "w-full rounded bg-navy focus:outline-none",
      isUsingKeyboard && "focus:ring focus:ring-goldenrod"
    )
  }

  return (
    <>
      <label
        htmlFor="transactionAmount"
        className="text-gray-light text-2xl"
      >
        Amount:
      </label>

      <span
        className={classes.amountValue}
      >
        <span className="text-nowrap">{isExpense ? "-" : "+"}{currency}</span>
        <input
          ref={amountInputRef}
          required
          type="number"
          step={0.01}
          id="transactionAmount"
          min={1}
          onChange={handleChange}
          value={value}
          className={classes.amountInput}
        />
      </span>
    </>
  )
}