import { useFetcher } from "react-router";

import { useModal, useSubmitModalForm, useTransaction } from "@/hooks";
import { handleAmountInputChange } from "@/utils/input";

import { ModalWrapper } from "@/components/modals/ModalWrapper";
import { HeaderModal } from "@/components/modals/HeaderModal";
import { Form } from "@/components/Form";
import { WalletModal } from "@/components/modals/WalletModal";
import { CategoryModal } from "@/components/modals/CategoryModal";
import { DateModal } from "@/components/modals/DateModal";

import { Content } from "./components/Content";
import { CustomAmountInput } from "./components/CustomAmountInput";
import { formatEntityName } from "@/utils/formatting";
import { getDateBtnValue } from "@/utils/date";

export default function TransactionsSection({ action, contentProps }) {
  // To do: add filtering logic
  const NAVY = "#002B5B";

  const fetcher = useFetcher({ key: "addTransaction" });

  const {
    modalState: [isModalOpen, setModalOpen],
    hasTransitioned,
    modalRef
  } = useModal({ fetcher });;

  const {
    transactionData: {
      amount,
      wallet,
      currency,
      category,
      date
    },
    updateTransactionData,
    resetTransactionData
  } = useTransaction();

  useSubmitModalForm({
    fetcher,
    closeModal: () => setModalOpen(false),
    resetModalData: () => resetTransactionData
  })

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
        },
        modal: {
          innerModal: {
            Component: WalletModal,
          },
          state: {
            value: wallet,
            updateState: (newWallet) => updateTransactionData({ wallet: newWallet })
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
      <Content {...contentProps} openModal={() => setModalOpen(true)} />

      {(isModalOpen || hasTransitioned) &&
        <ModalWrapper
          isModalOpen={isModalOpen}
          hasTransitioned={hasTransitioned}
          ref={modalRef}
        >
          <Form
            fetcher={fetcher}
            action={action}
            className="h-full"
            fields={transactionDataConfig.map(option => option.formData)}
          >
            <HeaderModal
              header={{
                type: "custom",
                customInput: {
                  Component: CustomAmountInput,
                  props: {
                    value: amount,
                    handleChange: handleInputChange,
                    isExpense,
                    currency
                  }
                }
              }}
              fields={transactionDataConfig.filter(option => option.field).map(option => option.field)}
              btn={{
                disabled: amount === "0" || category.name === "choose",
                value: "addTransaction",
                text: "complete transaction"
              }}
              color={NAVY}
            />
          </Form>
        </ModalWrapper>
      }
    </>
  )
}
