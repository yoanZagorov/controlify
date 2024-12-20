import cn from "classnames";

import { useBreakpoint, useModal } from "@/hooks";

import { Widget } from "@/components/widgets/Widget";
import { Section } from "../Section";
import { PlusCircleIcon } from "./components/PlusCircleIcon";
import { WalletWidget } from "./components/WalletWidget";
import { Link, useFetcher, useRouteLoaderData } from "react-router";
import { HeaderModal } from "@/components/modals/HeaderModal";
import { ModalWrapper } from "@/components/modals/ModalWrapper";
import { Form } from "@/components/Form";
import { useEffect, useState } from "react";
import { CategoriesVisibilityModal } from "@/components/modals/CategoriesVisibilityModal";
import { ColorModal } from "@/components/modals/ColorModal";
import { CurrencyModal } from "@/components/modals/CurrencyModal";
import { walletsColors } from "@/utils/wallet";
import { handleAmountInputChange } from "@/utils/input";
import { resetFetcher } from "@/services/router/utils";

export default function WalletsSection({ action, section, wallets }) {
  const DEFAULT_WALLET_COLOR = "#004D40";

  const { isMobileS } = useBreakpoint();
  const { userData: { user, categories: userCategories } } = useRouteLoaderData("app");

  const fetcher = useFetcher({ key: "addWallet" });

  const {
    modalState: [isModalOpen, setModalOpen],
    hasTransitioned,
    modalRef
  } = useModal({ fetcher });;

  const defaultWalletData = {
    name: "New Wallet",
    initialBalance: "0",
    currency: user.currency,
    categories: userCategories.map(category => ({ ...category, isVisible: true })),
    color: DEFAULT_WALLET_COLOR
  }

  const [walletData, setWalletData] = useState(defaultWalletData);

  function updateWalletData(newWalletData) {
    return setWalletData(prev => ({
      ...prev,
      ...newWalletData
    }))
  }

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      setModalOpen(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
      resetFetcher(fetcher);
      updateWalletData(defaultWalletData);
    }
  }, [fetcher.data, fetcher.state])

  const visibleWalletCategories = walletData.categories.filter(category => category.isVisible);

  const areAllCategoriesVisible = userCategories.length === visibleWalletCategories.length;

  function handleNameInputChange(e) {
    const value = e.target.value;

    const regex = /^[a-zA-Z0-9 _.-]+$/;

    if (value === "") updateWalletData({ name: value })

    if (value.length > 30) return;

    if (regex.test(value)) updateWalletData({ name: value });
  }

  function handleInitialBalanceInputChange(e) {
    handleAmountInputChange({
      state: {
        updateState: updateWalletData,
        value: walletData.initialBalance,
        prop: "initialBalance"
      },
      value: e.target.value
    })
  }



  const walletDataConfig = [
    {
      formData: {
        name: "name",
        value: walletData.name
      },
    },
    {
      formData: {
        name: "initialBalance",
        value: walletData.initialBalance
      },
      field: {
        name: "initial balance",
        props: {
          iconName: "scale",
          type: "input",
          displayValue: walletData.initialBalance,
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
        value: walletData.currency
      },
      field: {
        name: "currency",
        props: {
          iconName: "coins-stacked",
          type: "select",
          displayValue: walletData.currency,
        },
        modal: {
          innerModal: {
            Component: CurrencyModal,
          },
          state: {
            value: walletData.currency,
            updateState: (newCurrency) => updateWalletData({ currency: newCurrency })
          }
        }
      }
    },
    {
      formData: {
        name: "categories",
        value: JSON.stringify(walletData.categories.map(category => ({ id: category.id, isVisible: category.isVisible })))
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
            props: { categories: walletData.categories },
          },
          state: {
            value: walletData.categories,
            updateState: (newCategories) => updateWalletData({ categories: newCategories })
          },
          minHeight: "min-h-[75%]"
        }
      }
    },
    {
      formData: {
        name: "color",
        value: walletData.color
      },
      field: {
        name: "color",
        props: {
          iconName: "paint-roller",
          type: "select",
          displayValue: <div className="size-6 rounded-full" style={{ backgroundColor: walletData.color }}></div>,
        },
        modal: {
          innerModal: {
            Component: ColorModal,
            props: { colors: walletsColors },
          },
          state: {
            value: walletData.color,
            updateState: (newColorCode) => updateWalletData({ color: newColorCode })
          }
        }
      }
    },
  ]


  const walletWidgets = wallets.map(wallet => (
    <Link key={wallet.id} to={`/app/wallets/${wallet.id}`} data-actionable="true">
      <WalletWidget
        wallet={wallet}
        className="h-full"
      />
    </Link>
  ))

  const gridClasses = cn(
    "grid w-full gap-5",
    !isMobileS && "grid-cols-2"
  )

  return (
    <>
      <Section {...section}>
        <div className={gridClasses}>
          {walletWidgets}

          <Widget className="h-full flex flex-col justify-center items-center gap-1.5">
            <h4 className="text-lg font-bold text-navy">Add Wallet</h4>

            <button
              onClick={() => setModalOpen(true)}
              className="size-12 rounded-full focus:outline-none focus-visible:ring focus-visible:ring-goldenrod"
              data-actionable="true"
            >
              <PlusCircleIcon
                className="size-full"
                circleColor="fill-navy"
                plusColor="fill-goldenrod"
              />
            </button>
          </Widget>
        </div>
      </Section>

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
            fields={walletDataConfig.map(option => option.formData)}
          >
            <HeaderModal
              header={{
                input: {
                  props: {
                    value: walletData.name,
                    onChange: handleNameInputChange,
                    min: 2,
                    max: 50
                  }
                }
              }}
              fields={walletDataConfig.filter(option => option.field).map(option => option.field)}
              btn={{
                disabled: false,
                value: "addWallet",
                text: "add wallet"
              }}
              color={walletData.color}
            />
          </Form>
        </ModalWrapper>
      }
    </>
  )
}
