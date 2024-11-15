import cn from "classnames";
import { useActionData, useFetcher } from "react-router-dom";

import { useAutoFocus, useOutsideClick, useTransaction } from "@/hooks";

import { TransactionFormField } from "./components/TransactionFormField";
import { Button } from "@/components/Button";
import { useEffect } from "react";

export default function TransactionModal({ closeModal, isTransactionModalOpen, hasTransitioned }) {
  const {
    transactionData: {
      amount,
      currency,
      category,
    },
    updateTransactionData
  } = useTransaction();

  const amountInputRef = useAutoFocus();
  const formRef = useOutsideClick(isTransactionModalOpen, closeModal);

  const fetcher = useFetcher({ key: "add-transaction" });

  const transactionType = category.type || "expense";
  const isExpense = transactionType === "expense";

  const isUsingKeyboard = document.body.classList.contains("using-keyboard");

  function handleChange(e) {
    const value = e.target.value;

    const regex = /^\d{1,7}(?:\.\d{1,2})?$/;

    if (value === "") {
      updateTransactionData({ amount: "0" });
      return;
    }

    if (amount === "0" && /^0[0-9]$/.test(value)) {
      updateTransactionData({ amount: value.replace("0", "") });;
      return;
    }

    if (regex.test(value)) {
      updateTransactionData({ amount: value });
      return;
    }
  }

  const classes = {
    modal: "fixed left-0 rounded-lg duration-300",
    overlay: function () { // turned to method, in order to access the modal property
      return cn(
        "h-screen w-screen top-0 bg-black z-20 transition-opacity",
        this.modal,
        (isTransactionModalOpen && hasTransitioned) ? "opacity-50" : "opacity-0"
      )
    },
    form: function () { // turned to method, in order to access the modal property 
      return cn(
        "h-[90%] ml:w-[calc(425px-2*16px)] bottom-0 ml:inset-0 ml:m-auto bg-gray-light transition-transform z-30", // calc - ml breakpoint - padding
        this.modal,
        !(isTransactionModalOpen && hasTransitioned) && "translate-y-[100vh]"
      )
    },
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
      {/* Overlay */}
      <div className={classes.overlay()}></div>

      {/* Modal */}
      <fetcher.Form
        method="post"
        action="/app/dashboard"
        className={classes.form()}
        ref={formRef}
      >
        <div className="relative w-full h-full">
          <div className="py-10 px-4 tab:px-6 flex items-end gap-4 rounded-t-lg font-semibold tracking-wide bg-navy shadow">
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
                name="amount"
                type="number"
                step={0.01}
                id="transactionAmount"
                required
                min={1}
                onChange={handleChange}
                value={amount}
                className={classes.amountInput}
              />
            </span>
          </div>

          <div className="mt-16 px-4 tab:px-6 flex flex-col">
            <div className="flex flex-col gap-8">
              <TransactionFormField
                name="wallet"
              />
              <TransactionFormField
                name="category"
              />
              <TransactionFormField
                name="date"
              />
            </div>

            <Button
              type="submit"
              size="l"
              disabled={amount === "0" || category.name === "choose"}
              name="intent"
              value="add-transaction"
              className="mt-12 ll:py-4 mm:self-center focus:ring-4"
            >
              {/* {fetcher.state === "loading" || fetcher.state === "submitting" ? "Submitting..." : "Complete Transaction"} */}
              Complete Transaction
            </Button>
          </div>
        </div>
      </fetcher.Form>
    </>
  )
}