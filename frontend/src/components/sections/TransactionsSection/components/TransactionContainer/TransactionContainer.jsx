import { useTransaction } from "@/hooks";
import { formatEntityNameForUI } from "@/utils/formatting";
import { handleAmountInputChange } from "@/utils/input";
import { getDateBtnValue } from "@/utils/date";

import { CategoryModal } from "@/components/modals/CategoryModal";
import { DateModal } from "@/components/modals/DateModal";
import { HeaderModal } from "@/components/modals/HeaderModal";
import { ModalWrapper } from "@/components/modals/ModalWrapper";
import { WalletModal } from "@/components/modals/WalletModal";
import { CustomAmountInput } from "@/components/sections/TransactionsSection/components/CustomAmountInput";
import { useFetcher, useRouteLoaderData } from "react-router";
import { COLORS } from "@/constants";

export default function TransactionContainer({ mode = "add", modal, formProps, children }) {
  const DEFAULT_TRANSACTION_TYPE = "expense";

  const isEditTransaction = mode === "edit";
  const {
    modalState: [isModalOpen, setModalOpen],
    hasTransitioned,
    modalRef
  } = modal;

  const { userData: { wallets, categories } } = useRouteLoaderData("app");

  const deleteTransactionFetcher = isEditTransaction ? useFetcher({ key: "deleteTransaction" }) : {};

  const { transactionData, updateTransactionData } = useTransaction();
  const { amount, wallet, currency, category, date } = transactionData;
  const { transactionId } = isEditTransaction ? transactionData : {};

  const transactionType = category.type || DEFAULT_TRANSACTION_TYPE;
  const isExpense = transactionType === "expense";

  const transactionDataConfig = [
    {
      formData: {
        name: "amount",
        value: amount
      }
    },
    {
      formData: {
        name: "wallet",
        value: wallet.id
      },
      field: {
        name: "wallet",
        props: {
          iconName: "wallet",
          displayValue: formatEntityNameForUI(wallet.name),
          controlProps: {
            disabled: wallet.isLocked
          }
        },
        modal: {
          innerModal: {
            Component: WalletModal,
            props: { wallets }
          },
          state: {
            value: wallet,
            // Spreading the old wallet data to not overwrite the isLocked prop
            updateState: (newWallet) => updateTransactionData({ wallet: { ...wallet, id: newWallet.id, name: newWallet.name }, currency: newWallet.currency })
          },
        }
      }
    },
    {
      formData: {
        name: "category",
        value: category.id
      },
      field: {
        name: "category",
        props: {
          iconName: "categories",
          displayValue: formatEntityNameForUI(category.name),
        },
        modal: {
          innerModal: {
            Component: CategoryModal,
            props: { categories, defaultType: transactionType, isToggleSwitchDisabled: isEditTransaction }
          },
          state: {
            value: category,
            updateState: (newCategory) => updateTransactionData({ category: newCategory })
          },
          minHeight: "min-h-[75%]" // ensures no "jump shifts" in the UI
        }
      }
    },
    {
      formData: {
        name: "date",
        value: date
      },
      field: {
        name: "date",
        props: {
          iconName: "calendar",
          displayValue: getDateBtnValue(date),
        },
        modal: {
          innerModal: {
            Component: DateModal,
          },
          state: {
            value: date,
            updateState: (newDate) => updateTransactionData({ date: newDate })
          },
        }
      }
    },
    ...(transactionId ? [{
      formData: {
        name: "transactionId",
        value: transactionId
      }
    }] : [])
  ];

  let headerModalFields = [];
  transactionDataConfig.forEach(option => { if (option.field) headerModalFields.push(option.field) });

  return (
    <>
      {children}

      {(isModalOpen || hasTransitioned) &&
        <ModalWrapper
          isModalOpen={isModalOpen}
          hasTransitioned={hasTransitioned}
          ref={modalRef}
          minHeight="h-[90%]" // Keep it like this or on smaller screens it doesn't stretch to the bottom
        >
          <HeaderModal
            entity="transaction"
            formProps={{
              fields: transactionDataConfig.map(option => option.formData),
              ...formProps
            }}
            header={{
              type: "custom",
              CustomComponent:
                <CustomAmountInput
                  value={amount}
                  onChange={(e) => handleAmountInputChange({
                    state: {
                      updateState: updateTransactionData,
                      value: amount,
                      prop: "amount"
                    },
                    value: e.target.value
                  })}
                  isExpense={isExpense}
                  currency={currency}
                  isDeleteBtn={isEditTransaction}
                />,
              deleteEntityFetcher: deleteTransactionFetcher
            }}
            fields={headerModalFields}
            color={COLORS.THEME.NAVY}
          />
        </ModalWrapper>
      }
    </>
  )
}