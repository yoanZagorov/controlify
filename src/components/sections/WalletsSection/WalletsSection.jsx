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
import { useState } from "react";
import { CategoriesVisibilityModal } from "@/components/modals/CategoriesVisibilityModal";
import { ColorModal } from "@/components/modals/ColorModal";
import { CurrencyModal } from "@/components/modals/CurrencyModal";

export default function WalletsSection({ section, wallets }) {
  const DEFAULT_WALLET_COLOR = "#004D40";

  const { isMobileS } = useBreakpoint();
  const { userData: { user, categories: userCategories } } = useRouteLoaderData("app");

  const fetcher = useFetcher({ key: "addWallet" });

  const {
    modalState: [isModalOpen, setModalOpen],
    hasTransitioned,
    modalRef
  } = useModal({ fetcher });;


  const [walletData, setWalletData] = useState({
    name: "New Wallet",
    initialBalance: "0.00",
    currency: user.currency,
    categories: userCategories.map(category => ({ id: category.id, isVisible: true })),
    color: DEFAULT_WALLET_COLOR
  })

  function updateWalletData(newWalletData) {
    return setWalletData(prev => ({
      ...prev,
      ...newWalletData
    }))
  }

  const areAllCategoriesVisible = userCategories.length === walletData.categories.length;

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
        value: walletData.currency
      },
      field: {
        name: "initial balance",
        props: {
          iconName: "scale",
          type: "input",
          displayValue: walletData.initialBalance,
          handleChange: (e) => updateWalletData({ initialBalance: e.target.value })
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
          type: "non-blocking",
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
        value: JSON.stringify(walletData.categories)
      },
      field: {
        name: "categories",
        props: {
          iconName: "categories",
          type: "select",
          displayValue: areAllCategoriesVisible ? "All" : walletData.categories.length,
        },
        modal: {
          type: "blocking",
          innerModal: {
            Component: CategoriesVisibilityModal,
            props: { categories: walletData.categories },
          },
          state: {
            value: walletData.categories,
            updateState: (newCategories) => updateWalletData({ categories: newCategories })
          }
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
          type: "non-blocking",
          innerModal: {
            Component: ColorModal,
            props: { color: walletData.color },
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
            action="/app/wallets"
            className="h-full"
            fields={walletDataConfig.map(option => option.formData)}
          >
            <HeaderModal
              header={{
                content: {
                  input: {
                    value: walletData.name,
                    handleChange: (e) => updateWalletData({ name: e.target.value })
                  }
                }
              }}
              btn={{
                disabled: false,
                value: "addWallet",
                text: "add wallet"
              }}
              color={walletData.color}
              items={walletDataConfig.filter(option => option.field).map(option => option.field)}
            />
          </Form>
        </ModalWrapper>
      }
    </>
  )
}
