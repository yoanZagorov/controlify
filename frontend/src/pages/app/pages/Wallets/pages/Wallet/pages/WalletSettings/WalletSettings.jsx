import { useEffect } from "react";
import { useFetcher, useNavigate, useRouteLoaderData } from "react-router";

import { resetFetcher } from "@/services/router/utils";

import { CategoriesVisibilityModal } from "@/components/modals/CategoriesVisibilityModal";
import { ColorModal } from "@/components/modals/ColorModal";
import { CurrencyModal } from "@/components/modals/CurrencyModal";
import { SettingsSection } from "@/components/sections/SettingsSection";
import { useLayout, useScrollToTop, useWalletUpdate } from "@/hooks";
import { handleWalletNameInputChange } from "@/utils/input";
import { COLORS } from "@/constants";

export default function WalletSettings() {
  useScrollToTop();

  const navigate = useNavigate();

  const { userData: { categories: userCategories } } = useRouteLoaderData("app");
  const { wallet: { id, deletedAt, isDefault } } = useRouteLoaderData("wallet");

  const { isSingleColLayout } = useLayout();

  const updateWalletFetcher = useFetcher({ key: "updateWallet" });

  useEffect(() => {
    if (updateWalletFetcher.state === "idle" && updateWalletFetcher.data) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      resetFetcher(updateWalletFetcher);
    }
  }, [updateWalletFetcher.data, updateWalletFetcher.state])

  useEffect(() => {
    if (deletedAt) {
      navigate("/app/wallets");
    }
  }, [updateWalletFetcher.data, updateWalletFetcher.state]);

  const {
    walletData: {
      name,
      currency,
      categories,
      color
    },
    updateWalletData
  } = useWalletUpdate();

  const visibleWalletCategories = categories.filter(category => category.isVisible);
  const areAllCategoriesVisible = userCategories.length = visibleWalletCategories.length;

  const settingsDataConfig = [
    {
      formData: {
        name: "name",
        value: name
      },
      field: {
        name: "name",
        props: {
          iconName: "heading",
          type: "input",
          displayValue: name,
          inputProps: {
            value: name,
            onChange: (e) => handleWalletNameInputChange({ value: e.target.value, updateState: updateWalletData }),
            min: 2,
            max: 50
          }
        },
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
          type: {
            layout: "fullscreen",
          },
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
            layout: "fullscreen",
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
          minHeight: "min-h-[90%]"
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
          type: {
            layout: "fullscreen",
          },
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

  return (
    <SettingsSection
      formProps={{
        fetcher: updateWalletFetcher,
        action: `/app/wallets/${id}`,
        btn: {
          props: {
            value: "updateWallet"
          }
        }
      }}
      isSpaceLimited={isSingleColLayout}
      isDeleteBtn={!isDefault}
      settings={settingsDataConfig}
    />
  )
}
