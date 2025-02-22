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
import { FullScreenModalWrapper } from "@/components/modal-wrappers/FullScreenModalWrapper";

export default function TransactionContainer({ mode = "add", modal, formProps, submitBtn, children }) {
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
  const { amount, type, currency, wallet, category, date } = transactionData;
  const { transactionId } = isEditTransaction ? transactionData : {};

  const transactionType = type || DEFAULT_TRANSACTION_TYPE;
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
        name: "walletId",
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
          minHeight: "min-h-[40%]"
        }
      }
    },
    {
      formData: {
        name: "categoryId",
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
            updateState: (newCategory) => updateTransactionData({ category: { id: newCategory.id, name: newCategory.name }, type: newCategory.type })
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
        <FullScreenModalWrapper
          isModalOpen={isModalOpen}
          hasTransitioned={hasTransitioned}
          modalRef={modalRef}
          layoutProps={{
            height: "h-[90%]", // Avoid using vh, since it causes problems on mobile
            handleOverflow: false // Overflow is handled in the HeaderModal
          }}
        >
          <HeaderModal
            entity="transaction"
            formProps={{
              fields: transactionDataConfig.map(option => option.formData),
              ...formProps
            }}
            submitBtn={submitBtn}
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
                  // onChange={(e) => updateTransactionData({ amount: e.target.value })} // used for testing backend functionality
                  isExpense={isExpense}
                  currency={currency}
                  isDeleteBtn={isEditTransaction}
                />,
              deleteEntityFetcher: deleteTransactionFetcher
            }}
            parentModalRef={modalRef}
            fields={headerModalFields}
            color={COLORS.THEME.NAVY}
          />
        </FullScreenModalWrapper>
      }
    </>
  )
}