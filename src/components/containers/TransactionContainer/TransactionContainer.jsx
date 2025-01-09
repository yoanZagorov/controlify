import { useTransaction } from "@/hooks";
import { formatEntityName } from "@/utils/formatting";
import { handleAmountInputChange } from "@/utils/input";
import { getDateBtnValue } from "@/utils/date";

import { CategoryModal } from "@/components/modals/CategoryModal";
import { DateModal } from "@/components/modals/DateModal";
import { HeaderModal } from "@/components/modals/HeaderModal";
import { ModalWrapper } from "@/components/modals/ModalWrapper";
import { WalletModal } from "@/components/modals/WalletModal";
import { CustomAmountInput } from "@/components/sections/TransactionsSection/components/CustomAmountInput";

export default function TransactionContainer({ modal, fetcher, action, submitBtn, isDeleteBtn = false, children }) {
  const NAVY = "#002B5B";

  const {
    modalState: [isModalOpen, setModalOpen],
    hasTransitioned,
    modalRef
  } = modal;

  const {
    transactionData: {
      amount,
      wallet,
      currency,
      category,
      date,
      transactionId
    },
    updateTransactionData
  } = useTransaction();

  const transactionType = category.type || "expense";
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
          type: "select",
          displayValue: formatEntityName(wallet.name),
          selectBtnProps: {
            disabled: wallet.isPreselected
          }
        },
        modal: {
          innerModal: {
            Component: WalletModal,
          },
          state: {
            value: wallet,
            updateState: (newWallet) => updateTransactionData({ wallet: { ...wallet, ...newWallet } }) // Spreading the old wallet data to keep the isPreselected prop
          },
          minHeight: "min-h-[50%]",
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
          type: "select",
          displayValue: formatEntityName(category.name),
        },
        modal: {
          innerModal: {
            Component: CategoryModal,
            props: { isToggleSwitchDisabled: !!transactionId }
          },
          state: {
            value: category,
            updateState: (newCategory) => updateTransactionData({ category: newCategory })
          },
          minHeight: "min-h-[75%]"
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
          type: "select",
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

  function handleInputChange(e) {
    handleAmountInputChange({
      state: {
        updateState: updateTransactionData,
        value: amount,
        prop: "amount"
      },
      value: e.target.value
    })
  }

  return (
    <>
      {children}

      {(isModalOpen || hasTransitioned) &&
        <ModalWrapper
          isModalOpen={isModalOpen}
          hasTransitioned={hasTransitioned}
          ref={modalRef}
        >
          <HeaderModal
            formProps={{
              fetcher,
              action,
              fields: transactionDataConfig.map(option => option.formData),
              btn: submitBtn
            }}
            header={{
              type: "custom",
              customInput: {
                Component: CustomAmountInput,
                props: {
                  value: amount,
                  handleChange: handleInputChange,
                  isExpense,
                  currency,
                  isDeleteBtn
                }
              }
            }}
            fields={transactionDataConfig.filter(option => option.field).map(option => option.field)}
            color={NAVY}
          />
        </ModalWrapper>
      }
    </>
  )
}