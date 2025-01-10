import { useFetcher, useRouteLoaderData } from "react-router";

import { useModal, useWalletSubmission } from "@/hooks";
import { walletsColors } from "@/utils/wallet";
import { handleAmountInputChange, handleWalletNameInputChange } from "@/utils/input";

import { HeaderModal } from "@/components/modals/HeaderModal";
import { ModalWrapper } from "@/components/modals/ModalWrapper";
import { CategoriesVisibilityModal } from "@/components/modals/CategoriesVisibilityModal";
import { ColorModal } from "@/components/modals/ColorModal";
import { CurrencyModal } from "@/components/modals/CurrencyModal";
import { Content } from "./components/Content";

export default function WalletsSection({ action, contentProps }) {
  const { userData: { categories: userCategories } } = useRouteLoaderData("app");

  const fetcher = useFetcher({ key: "addWallet" });

  const {
    modalState: [isModalOpen, setModalOpen],
    hasTransitioned,
    modalRef
  } = useModal({ fetcher });;

  const {
    walletData: {
      name,
      initialBalance,
      currency,
      categories,
      color
    },
    updateWalletData
  } = useWalletSubmission();

  const visibleWalletCategories = categories.filter(category => category.isVisible);
  const areAllCategoriesVisible = userCategories.length === visibleWalletCategories.length;

  function handleInitialBalanceInputChange(e) {
    handleAmountInputChange({
      state: {
        updateState: updateWalletData,
        value: initialBalance,
        prop: "initialBalance"
      },
      value: e.target.value
    })
  }

  const walletDataConfig = [
    {
      formData: {
        name: "name",
        value: name
      },
    },
    {
      formData: {
        name: "initialBalance",
        value: initialBalance
      },
      field: {
        name: "initial balance",
        props: {
          iconName: "scale",
          type: "input",
          displayValue: initialBalance,
          inputProps: {
            onChange: handleInitialBalanceInputChange,
            type: "number",
            step: 0.01,
          }
        }
      }
    },
    {
      formData: {
        name: "currency",
        value: currency
      },
      field: {
        name: "currency",
        props: {
          iconName: "coins-stacked",
          type: "select",
          displayValue: currency,
        },
        modal: {
          innerModal: {
            Component: CurrencyModal,
          },
          state: {
            value: currency,
            updateState: (newCurrency) => updateWalletData({ currency: newCurrency })
          }
        }
      }
    },
    {
      formData: {
        name: "categories",
        value: JSON.stringify(categories.map(category => ({ id: category.id, isVisible: category.isVisible })))
      },
      field: {
        name: "categories",
        props: {
          iconName: "categories",
          type: "select",
          displayValue: areAllCategoriesVisible ? "All" : visibleWalletCategories.length,
        },
        modal: {
          type: {
            blocking: true
          },
          innerModal: {
            Component: CategoriesVisibilityModal,
            props: { categories },
          },
          state: {
            value: categories,
            updateState: (newCategories) => updateWalletData({ categories: newCategories })
          },
          minHeight: "min-h-[75%]"
        }
      }
    },
    {
      formData: {
        name: "color",
        value: color
      },
      field: {
        name: "color",
        props: {
          iconName: "paint-roller",
          type: "select",
          displayValue: <div className="size-6 rounded-full" style={{ backgroundColor: color }}></div>,
        },
        modal: {
          innerModal: {
            Component: ColorModal,
            props: { colors: walletsColors },
          },
          state: {
            value: color,
            updateState: (newColorCode) => updateWalletData({ color: newColorCode })
          }
        }
      }
    },
  ]

  return (
    <>
      <Content {...contentProps} openModal={() => setModalOpen(true)} />

      {(isModalOpen || hasTransitioned) &&
        <ModalWrapper
          isModalOpen={isModalOpen}
          hasTransitioned={hasTransitioned}
          ref={modalRef}
          minHeight="h-[90%]"
        >
          <HeaderModal
            formProps={{
              fetcher,
              action,
              fields: walletDataConfig.map(option => option.formData),
              btn: {
                text: "add wallet",
                props: {
                  value: "addWallet"
                }
              }
            }}
            header={{
              input: {
                props: {
                  value: name,
                  onChange: (e) => handleWalletNameInputChange({ value: e.target.value, updateState: updateWalletData }),
                  min: 2,
                  max: 50
                }
              }
            }}
            fields={walletDataConfig.filter(option => option.field).map(option => option.field)}
            color={color}
          />
        </ModalWrapper>
      }
    </>
  )
}
