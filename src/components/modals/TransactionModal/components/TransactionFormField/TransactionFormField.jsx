import { useState } from "react";

import { useTransaction } from "@/utils/hooks";
import { capitalize } from "@/utils/generic";
import { getDateBtnValue } from "./utils";

import { SelectModal } from "@/components/modals/SelectModal";
import { CategoryModal } from "@/components/modals/CategoryModal";
import { DateModal } from "@/components/modals/DateModal";
import { WalletModal } from "@/components/modals/WalletModal";
import { SvgIcon } from "@/components/SvgIcon";
import { Button } from "@/components/Button";

export default function TransactionFormField({ name }) {
  const { transactionData, updateTransactionData } = useTransaction();
  const [isSelectModalOpen, setSelectModalOpen] = useState(false);
  const { wallet, category, categoriesType, date } = transactionData;

  const formFields = {
    "wallet": {
      Modal: WalletModal,
      modalHeight: "h-1/3",
      inputValue: wallet.id,
      btnValue: capitalize(wallet.name),
      iconName: "wallet",
      state: {
        value: wallet,
        updateState: (newWallet) => updateTransactionData({
          wallet: {
            name: newWallet.name,
            id: newWallet.id
          }
        })
      }
    },
    "category": {
      Modal: CategoryModal,
      modalHeight: "h-3/5",
      inputValue: category.id,
      btnValue: capitalize(category.name),
      iconName: "categories",
      state: {
        category: {
          value: category,
          updateState: (newCategory) => updateTransactionData({
            category: {
              name: newCategory.name,
              id: newCategory.id
            }
          })
        },
        categoriesType: {
          value: categoriesType,
          updateState: (newCategoriesType) => updateTransactionData({
            categoriesType: typeof newCategoriesType === "function"
              ? newCategoriesType(transactionData.categoriesType)
              : newCategoriesType
          })
        }
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

      <Button
        variant="secondary"
        size="xs"
        onClick={() => setSelectModalOpen(wasOpen => !wasOpen)}
        className="ml-auto min-w-24 flex justify-between gap-2 items-center focus:ring-1"
        type="button"
      >
        <span>{btnValue}</span>
        <span>{">"}</span>
      </Button>

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