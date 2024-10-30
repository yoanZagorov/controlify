import { Form as RouterForm } from "react-router-dom";

import { dashboardAction } from "services/router/actions";

import { useTransaction } from "@/utils/hooks";

import { TransactionFormField } from "./components/TransactionFormField";

export default function TransactionModal({ closeModal }) {
  const { transactionData, updateTransactionData } = useTransaction();

  const { amount, currency, categoryType } = transactionData;

  function handleChange(e) {
    const value = e.target.value;

    const regex = /^\d{1,7}(?:\.\d{1,2})?$/;

    if (value === "") {
      updateTransactionData({ amount: "0" });
    }

    if (amount === "0" && /^0[1-9]$/.test(value)) {
      updateTransactionData({ amount: value.replace("0", "") });
      return;
    }

    if (regex.test(value)) {
      updateTransactionData({ amount: value });
    }
  }

  const isExpense = categoryType === "expense";

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
      >
        <div className="fixed bottom-0 h-[90%] w-screen rounded-t-lg bg-gray-light">
          <div className="py-10 px-4 mm:px-6 flex items-end gap-4 w-full rounded-t-lg font-semibold tracking-wide bg-navy">
            <label
              htmlFor="transactionAmount"
              className="text-gray-light text-2xl"
            >
              Amount:
            </label>

            <div
              className={`${isExpense ? "text-red-light" : "text-green-light"} w-full flex gap-2 items-end text-xl`}
            >
              <span className="whitespace-nowrap">{isExpense ? "-" : ""}{currency}</span>
              <input
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

          <div className="mt-16 px-4 mm:px-6 flex flex-col gap-8">
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
        </div >
      </RouterForm>
    </>
  )
}