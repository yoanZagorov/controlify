import { useState } from "react";
import { useTransaction } from "@/utils/hooks";

import { capitalize } from "@/utils/generic";

import { SelectModal } from "@/components/SelectModal";
import { CategoryModal } from "@/components/CategoryModal";
import { DateModal } from "@/components/DateModal";
import { WalletModal } from "@/components/WalletModal";
import { SvgIcon } from "@/components/SvgIcon";


export default function TransactionFormField({ name }) {
  const [isSelectModalOpen, setSelectModalOpen] = useState(false);
  const { wallet, category, date } = useTransaction().transactionData;

  function handleClose() {
    setSelectModalOpen(false);
  }

  const formFields = {
    "wallet": {
      modal: WalletModal,
      inputValue: wallet,
      defaultOption: capitalize(wallet),
      iconName: "wallet"
    },
    "category": {
      modal: CategoryModal,
      inputValue: category,
      defaultOption: capitalize(category),
      iconName: "categories"
    },
    "date": {
      modal: DateModal,
      inputValue: date,
      defaultOption: capitalize(date),
      iconName: "calendar"
    }
  };

  const ModalComponent = formFields[name].modal;
  const inputValue = formFields[name].inputValue;
  const defaultOption = formFields[name].defaultOption;
  const iconName = formFields[name].iconName;

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
        className="ml-auto w-24 flex justify-between items-center bg-gray-medium border px-2 py-1 font-bold rounded"
      >
        <span>{defaultOption}</span>
        <span>{">"}</span>
      </button>

      {isSelectModalOpen &&
        <SelectModal
          name={name}
          closeModal={handleClose}
        >
          <ModalComponent
            closeModal={handleClose}
          />
        </SelectModal>
      }
    </div>
  )
}