import { CategoriesVisibilityModal } from "@/components/modals/CategoriesVisibilityModal";
import { ColorModal } from "@/components/modals/ColorModal";
import { CurrencyModal } from "@/components/modals/CurrencyModal";
import { HeaderModal } from "@/components/modals/HeaderModal";
import { ModalWrapper } from "@/components/modals/ModalWrapper";
import { COLORS, VALIDATION_RULES } from "@/constants";
import { useWalletSubmission } from "@/hooks";
import { handleAmountInputChange, handleWalletNameInputChange } from "@/utils/input";
import { useMemo } from "react";
import { useRouteLoaderData } from "react-router";

export default function WalletsContainer({ fetcher, modal, action, children }) {
  const INITIAL_BALANCE_INPUT_STEP = 0.01;

  const { userData: { categories: userCategories } } = useRouteLoaderData("app");

  const {
    modalState: [isModalOpen, setModalOpen],
    hasTransitioned,
    modalRef
  } = modal;

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

  // Memoizing calculations
  const areAllCategoriesVisible = useMemo(() => {
    return userCategories.length === categories.filter(category => category.isVisible).length;
  }, [categories]);

  const stringifiedCategories = useMemo(() => {
    // submitting only the neccessary and serializing since the data type is more complex
    return JSON.stringify(categories.map(category => ({ id: category.id, isVisible: category.isVisible })))
  }, [categories])

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

  // Keeping all of the data for each field in one big object
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
          controlProps: {
            onChange: handleInitialBalanceInputChange,
            type: "number",
            step: INITIAL_BALANCE_INPUT_STEP,
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
        value: stringifiedCategories
      },
      field: {
        name: "categories",
        props: {
          iconName: "categories",
          type: "select",
          displayValue: areAllCategoriesVisible ? "All" : visibleWalletCategories.length,
        },
        modal: {
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
            props: { colors: COLORS.ENTITIES.WALLET_COLORS },
          },
          state: {
            value: color,
            updateState: (newColorCode) => updateWalletData({ color: newColorCode })
          }
        }
      }
    },
  ]

  // Traversing the array once (On), instead of filtering and mapping (2On)
  let headerModalFields = [];
  walletDataConfig.forEach(option => { if (option.field) headerModalFields.push(option.field) });

  return (
    <>
      {children}

      {(isModalOpen || hasTransitioned) &&
        <ModalWrapper
          isModalOpen={isModalOpen}
          hasTransitioned={hasTransitioned}
          ref={modalRef}
          minHeight="min-h-[90%]"
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
              type: "simple",
              inputProps: {
                value: name,
                onChange: (e) => handleWalletNameInputChange({ value: e.target.value, updateState: updateWalletData }),
                min: VALIDATION_RULES.WALLET_NAME.MIN_LENGTH,
                max: VALIDATION_RULES.WALLET_NAME.MAX_LENGTH,
                className: "selection:text-gray-light selection:bg-[#3390FF]"
              }
            }}
            fields={headerModalFields}
            color={color}
          />
        </ModalWrapper>
      }
    </>
  )
}