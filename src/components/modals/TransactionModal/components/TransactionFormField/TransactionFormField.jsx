import { useState } from "react";

import { useMountTransition, useTransaction } from "@/hooks";
import { capitalize } from "@/utils/str";
import { getDateBtnValue } from "./helpers";

import { SelectModal } from "@/components/modals/SelectModal";
import { CategoryModal } from "@/components/modals/CategoryModal";
import { DateModal } from "@/components/modals/DateModal";
import { WalletModal } from "@/components/modals/WalletModal";
import { SvgIcon } from "@/components/SvgIcon";
import { Button } from "@/components/Button";
import formatEntityName from "@/utils/formatting/formatEntityName";

export default function TransactionFormField({ name }) {
  const {
    transactionData: {
      wallet,
      category,
      date
    },
    updateTransactionData
  } = useTransaction();

  const [isSelectModalOpen, setSelectModalOpen] = useState(false);
  const hasTransitioned = useMountTransition(isSelectModalOpen, 300)

  const formFields = {
    "wallet": {
      Modal: WalletModal,
      modalHeight: "h-1/2",
      contentMaxW: "max-w-none",
      inputValue: wallet.id,
      btnValue: formatEntityName(wallet.name),
      iconName: "wallet",
      state: {
        value: wallet,
        updateState: (newWallet) => updateTransactionData({
          wallet: {
            id: newWallet.id,
            name: newWallet.name
          }
        })
      }
    },
    "category": {
      Modal: CategoryModal,
      modalHeight: "h-4/5",
      contentMaxW: "max-w-none",
      inputValue: category.id,
      btnValue: formatEntityName(category.name),
      iconName: "categories",
      state: {
        value: category,
        updateState: (newCategory) => updateTransactionData({
          category: {
            id: newCategory.id,
            name: newCategory.name,
            type: newCategory.type
          }
        })
      }
    },
    "date": {
      Modal: DateModal,
      modalHeight: "h-[70%]",
      contentMaxW: "max-w-80",
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

  const { Modal, modalHeight, contentMaxW, inputValue, btnValue, iconName, state } = formFields[name];

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

      <SvgIcon iconName={iconName} className="size-8 fill-navy" />
      <span className="text-navy font-semibold">{capitalize(name)}</span>

      <Button
        type="button"
        size="s"
        disabled={name === "wallet" && wallet.isPreselected}
        colorPalette="secondaryDark"
        onClick={() => setSelectModalOpen(wasOpen => !wasOpen)}
        className="ml-auto flex justify-between gap-2 items-center focus:ring"
      >
        <span>{btnValue}</span>
        <span>{">"}</span>
      </Button>

      {(isSelectModalOpen || hasTransitioned) &&
        <SelectModal
          name={name}
          modalHeight={modalHeight}
          contentMaxW={contentMaxW}
          closeModal={handleClose}
          isSelectModalOpen={isSelectModalOpen}
          hasTransitioned={hasTransitioned}
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