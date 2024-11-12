import cn from "classnames";
import { Form as RouterForm, useActionData } from "react-router-dom";

import { useAutoFocus, useTransaction } from "@/hooks";

import { TransactionFormField } from "./components/TransactionFormField";
import { Button } from "@/components/Button";

export default function TransactionModal({ closeModal, isTransactionModalOpen, hasTransitioned }) {
  // To do - figure out how to close the modal on successful transaction
  const actionData = useActionData();
  const { errorMsg } = actionData ?? {};

  const {
    transactionData: {
      amount,
      currency,
      category,
      categoriesType
    },
    updateTransactionData
  } = useTransaction();

  const amountInputRef = useAutoFocus();

  function handleChange(e) {
    const value = e.target.value;

    const regex = /^\d{1,7}(?:\.\d{1,2})?$/;

    if (value === "") {
      updateTransactionData({ amount: "0" });
      return;
    }

    if (amount === "0" && /^0[1-9]$/.test(value)) {
      updateTransactionData({ amount: value.replace("0", "") });;
      return;
    }

    if (regex.test(value)) {
      updateTransactionData({ amount: value });
      return;
    }
  }

  const isExpenses = categoriesType === "expenses";

  const isUsingKeyboard = document.body.classList.contains("using-keyboard");

  const amountValueClasses = cn(
    "flex gap-2 items-end text-xl",
    isExpenses ? "text-red-light" : "text-green-light"
  )

  const classes = {
    modal: "fixed left-0 w-screen transition-all duration-300",
    overlay: function () { // turned to method, in order to access the modal property
      return cn(
        "h-screen top-0 bg-black z-20",
        this.modal,
        (isTransactionModalOpen && hasTransitioned) ? "opacity-50" : "opacity-0"
      )
    },
    form: function () { // turned to method, in order to access the modal property
      return cn(
        "h-[90%] rounded-t-lg bg-gray-light z-30",
        this.modal,
        (isTransactionModalOpen && hasTransitioned) ? "bottom-0" : "-bottom-full"
      )
    },
    amountInput: cn(
      "bg-navy focus:outline-none rounded w-full", //"focus-visible:ring focus-visible:ring-goldenrod"
      isUsingKeyboard && "focus:ring focus:ring-goldenrod"
    )
  }

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeModal}
        className={classes.overlay()}
      >
      </div>

      {/* Modal */}
      <RouterForm
        method="post"
        action="/app/dashboard"
        className={classes.form()}
      >
        <div className="py-10 px-4 tab:px-6 flex items-end gap-4 rounded-t-lg font-semibold tracking-wide bg-navy shadow">
          <label
            htmlFor="transactionAmount"
            className="text-gray-light text-2xl"
          >
            Amount:
          </label>

          <span
            className={amountValueClasses}
          >
            <span className="whitespace-nowrap">{isExpenses ? "-" : "+"}{currency}</span>
            <input
              ref={amountInputRef}
              name="amount"
              type="number"
              id="transactionAmount"
              required
              min={1}
              onChange={handleChange}
              value={amount}
              className={classes.amountInput}
            />
          </span>
        </div>

        {errorMsg && <p className="page__wrapper text-center mt-12 text-lg text-red-dark font-bold">{errorMsg}</p>}

        <div className="mt-16 page__wrapper flex flex-col">
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
            className="mt-12 ll:py-4 ls:text-xl ml:text-xl ml:py-4 ml:px-8 mm:self-center focus:ring-4"
          >
            Complete Transaction
          </Button>
        </div>
      </RouterForm>
    </>
  )
}