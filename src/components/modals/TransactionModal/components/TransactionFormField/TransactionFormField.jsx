import { useState } from "react";

import { useTransaction } from "@/utils/hooks";
import { capitalize } from "@/utils/generic";
import { getDateBtnValue } from "./utils";

import { SelectModal } from "@/components/modals/SelectModal";
import { CategoryModal } from "@/components/modals/CategoryModal";
import { DateModal } from "@/components/modals/DateModal";
import { WalletModal } from "@/components/modals/WalletModal";
import { SvgIcon } from "@/components/SvgIcon";

export default function TransactionFormField({ name }) {
  const { transactionData, updateTransactionData } = useTransaction();
  const [isSelectModalOpen, setSelectModalOpen] = useState(false);
  const { wallet, category, date } = transactionData;

  const formFields = {
    "wallet": {
      Modal: WalletModal,
      modalHeight: "h-1/3",
      inputValue: wallet,
      btnValue: capitalize(wallet),
      iconName: "wallet",
      state: {
        value: wallet,
        updateState: updateTransactionData // To do: Create a custom setter
      }
    },
    "category": {
      Modal: CategoryModal,
      modalHeight: "h-3/5",
      inputValue: category,
      btnValue: capitalize(category),
      iconName: "categories",
      state: {
        value: category,
        updateState: updateTransactionData // To do: Create a custom setter
      }
    },
    "date": {
      Modal: DateModal,
      modalHeight: "h-3/5",
      inputValue: date,
      btnValue: getDateBtnValue(date),
      iconName: "calendar",
      state: {
        value: date,
        updateState: (newDate) => updateTransactionData({
          date: typeof newDate === "function"
            ? newDate(transactionData.date)
            : newDate
        })
      }
    }
  };

  const { Modal, modalHeight, inputValue, btnValue, iconName, state } = formFields[name];

  function handleClose() {
    setSelectModalOpen(false);
  }

  return (
    <div className="flex items-center gap-4 pb-7 border-b border-navy border-opacity-50">
      <input
        type="hidden"
        name={name}
        value={inputValue}
      />

      <SvgIcon iconName={iconName} className="w-8 h-8 fill-navy" />
      <span className="text-navy font-semibold">{capitalize(name)}</span>

      <button
        type="button"
        onClick={() => setSelectModalOpen(wasOpen => !wasOpen)}
        className="ml-auto min-w-24 flex justify-between gap-2 items-center bg-gray-medium border px-2 py-1 font-bold rounded"
      >
        <span>{btnValue}</span>
        <span>{">"}</span>
      </button>

      {isSelectModalOpen &&
        <SelectModal
          name={name}
          modalHeight={modalHeight}
          closeModal={handleClose}
        >
          <Modal
            closeModal={handleClose}
            state={state}
          />
        </SelectModal>
      }
    </div>
  )
}