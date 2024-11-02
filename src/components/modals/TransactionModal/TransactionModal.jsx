import { Form as RouterForm, useActionData } from "react-router-dom";

import { dashboardAction } from "services/router/actions";

import { useTransaction } from "@/utils/hooks";

import { TransactionFormField } from "./components/TransactionFormField";
import cn from "classnames";
import { Button } from "@/components/Button";
import { useEffect } from "react";

export default function TransactionModal({ closeModal }) {
  // To do - figure out how to close the modal on successful transaction
  const actionData = useActionData();
  const { errorMsg } = actionData ?? {};

  const { transactionData, updateTransactionData } = useTransaction();
  const { amount, currency, category, categoriesType } = transactionData;

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

  const amountValueClasses = cn(
    "w-full flex gap-2 items-end text-xl",
    isExpenses ? "text-red-light" : "text-green-light"
  )

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeModal}
        className="fixed inset-auto h-screen w-screen bg-black opacity-50">
      </div>

      {/* Modal */}
      <RouterForm
        method="post"
        action={dashboardAction}
        className="fixed bottom-0 h-[90%] w-screen rounded-t-lg bg-gray-light"
      >
        <div className="py-10 page__wrapper flex items-end gap-4 w-full rounded-t-lg font-semibold tracking-wide bg-navy shadow">
          <label
            htmlFor="transactionAmount"
            className="text-gray-light text-2xl"
          >
            Amount:
          </label>

          <div
            className={amountValueClasses}
          >
            <span className="whitespace-nowrap">{isExpenses ? "-" : ""}{currency}</span>
            <input // To do: Auto-focus this input
              name="amount"
              type="number"
              id="transactionAmount"
              required
              min={1}
              onChange={handleChange}
              value={amount}
              className="bg-navy border-none focus:outline-none w-full"
            />
          </div>
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
            size="m"
            disabled={amount === "0" || category.name === "choose"}
            className="mt-12 ml:text-xl ml:py-4 ml:px-8 mm:self-center"
          >
            Complete Transaction
          </Button>
        </div>
      </RouterForm>
    </>
  )
}