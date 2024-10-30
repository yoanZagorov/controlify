import { Form as RouterForm } from "react-router-dom";
import { dashboardAction } from "services/router/actions";

import { TransactionFormField } from "./components/TransactionFormField";
import { useTransaction } from "@/utils/hooks";
import { useState } from "react";
import { handleAmountInput } from "@/utils/transaction";
import cn from "classnames";

export default function TransactionModal({ closeModal }) {
  const { transactionData, updateTransactionData } = useTransaction();

  const { wallet, currency, category, categoryType } = transactionData;

  const [amount, setAmount] = useState("0");

  function handleChange(e) {
    handleAmountInput(e, amount, setAmount);
  }

  const isExpense = categoryType === "expense";
  const amountColorClass = isExpense ? "text-red-light" : "text-green-dark";

  const formattedCurrency = `${isExpense ? "-" : ""}${currency}`

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeModal}
        className="fixed inset-auto h-screen w-screen bg-black opacity-50">
      </div>

      {/* Modal */}
      <div className="fixed bottom-0 h-[90%] w-screen rounded-t-lg bg-gray-light">
        <div className="py-10 px-4 mm:px-6 flex items-end gap-4 w-full rounded-t-lg font-semibold tracking-wide bg-navy">
          <label
            htmlFor="transactionAmount"
            className="text-gray-light text-2xl"
          >
            Amount:
          </label>

          <div
            className={cn(amountColorClass, "w-full flex gap-2 items-end text-xl")}
          >
            <span>{formattedCurrency}</span>
            <input
              name="amount"
              type="number"
              id="transactionAmount"
              min={1}
              max={10}
              onChange={handleChange}
              value={amount}
              className="bg-navy border-none focus:outline-none w-full"
            />
          </div>

        </div>

        <RouterForm
          method="post"
          action={dashboardAction}
          className="mt-16 px-4 mm:px-6 flex flex-col"
        >
          <TransactionFormField
            iconName="wallet"
            name="wallet"
            defaultOption="cash"
          />
        </RouterForm>
      </div>
    </>
  )
}