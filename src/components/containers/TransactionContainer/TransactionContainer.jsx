import { CategoryModal } from "@/components/modals/CategoryModal";
import { DateModal } from "@/components/modals/DateModal";
import { HeaderModal } from "@/components/modals/HeaderModal";
import { ModalWrapper } from "@/components/modals/ModalWrapper";
import { WalletModal } from "@/components/modals/WalletModal";
import { CustomAmountInput } from "@/components/sections/TransactionsSection/components/CustomAmountInput";
import { useModal, useSubmitModalForm, useTransaction } from "@/hooks";
import { formatEntityName } from "@/utils/formatting";
import { handleAmountInputChange } from "@/utils/input";
import { useFetcher } from "react-router";
import { Form } from "@/components/Form";
import { getDateBtnValue } from "@/utils/date";
import { Form as RouterForm } from "react-router";
import { Button } from "@/components/Button";
import { SvgIcon } from "@/components/SvgIcon";
import { DeletionConfirmationModal } from "@/components/modals/DeletionConfirmationModal";
import { useEffect } from "react";

export default function TransactionContainer({ modal, fetcher, action, modalBtn, deleteBtn = false, children }) {
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

  const {
    modalState: [isDeleteConfirmationModalOpen, setDeleteConfirmationModalOpen] = [],
    hasTransitioned: hasDeleteConfirmationModalTransitioned,
    modalRef: deleteConfirmationModalRef
  } = deleteBtn ? useModal({}) : {};

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
            updateState: (newWallet) => updateTransactionData({ wallet: { ...wallet, ...newWallet } })
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
            props: { isToggleSwitchDisabled: Boolean(transactionId) }
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
          <div className="relative w-full h-full rounded-t-lg ml:rounded-lg bg-gray-light">
            <Form
              fetcher={fetcher}
              action={action}
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
                btn={modalBtn}
                color={NAVY}
              />

              {deleteBtn &&
                <>
                  <button className="absolute top-11 right-4 tab:right-6 size-6" onClick={() => setDeleteConfirmationModalOpen(true)}>
                    <SvgIcon iconName="trash-can" className="size-full fill-red-light" />
                  </button>

                  {(isDeleteConfirmationModalOpen || hasDeleteConfirmationModalTransitioned) &&
                    <ModalWrapper
                      type={{
                        layout: "nested",
                        blocking: false
                      }}
                      isModalOpen={isDeleteConfirmationModalOpen}
                      hasTransitioned={hasDeleteConfirmationModalTransitioned}
                      ref={deleteConfirmationModalRef}
                      minHeight="min-h-[75%]"
                    >
                      <DeletionConfirmationModal
                        entity={{
                          name: "transaction",
                          id: transactionId
                        }}
                        closeModal={() => setDeleteConfirmationModalOpen(false)}
                      />
                    </ModalWrapper>
                  }
                </>
              }
            </Form>
          </div>
        </ModalWrapper>
      }
    </>
  )
}