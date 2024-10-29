import { Form as RouterForm } from "react-router-dom";
import { dashboardAction } from "services/router/actions";

import { TransactionFormField } from "./components/TransactionFormField";
import { useTransaction } from "@/utils/hooks";
import { useState } from "react";

export default function TransactionModal({ closeModal }) {
  const { transactionData, updateTransactionData } = useTransaction();

  const { wallet, currency, category, categoryType } = transactionData;

  const [amount, setAmount] = useState(0);

  function handleInputChange(e) {
    const regex = /^\d+$|^$/;

    if (regex.test(e.target.value)) {
      setAmount(e.target.value);
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
      <div className="fixed bottom-0 h-[90%] w-screen rounded-t-lg bg-gray-light">
        <div className="p-6 flex items-center gap-4 h-28 w-full rounded-t-lg text-3xl font-semibold tracking-wide bg-navy">
          <label
            htmlFor="transactionAmount"
            className="text-gray-light "
          >
            Amount:
          </label>

          <span
            className={`${isExpense ? "text-red-light" : "text-green-dark"}`}
          >
            {isExpense ? "-" : "+"}
            <input
              type="number"
              min={0}
              id="transactionAmount"
              value={amount}
              onChange={handleInputChange}
              className="bg-navy border-none min-w-[100px] max-w-[250px]"
            />
            {currency}
          </span>
        </div>

        <RouterForm
          method="post"
          action={dashboardAction}
          className="mt-16 p-6 flex flex-col"
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