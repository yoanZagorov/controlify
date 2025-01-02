import { useEffect, useState } from "react";
import { useFetcher, useRouteLoaderData } from "react-router";

import { resetFetcher } from "@/services/router/utils";
import { formatEntityName } from "@/utils/formatting";
import { walletsColors } from "@/utils/wallet";

import { CategoriesVisibilityModal } from "@/components/modals/CategoriesVisibilityModal";
import { ColorModal } from "@/components/modals/ColorModal";
import { CurrencyModal } from "@/components/modals/CurrencyModal";
import { SettingsSection } from "@/components/sections/SettingsSection";
import { useLayout } from "@/hooks";

export default function WalletSettings() {
  const { wallet: { id, name, currency, color, categories: walletCategories } } = useRouteLoaderData("wallet");
  const { userData: { categories: userCategories } } = useRouteLoaderData("app");

  const { isSingleColLayout } = useLayout();

  const updateWalletFetcher = useFetcher({ key: "updateWallet" });
  const deleteWalletFetcher = useFetcher({ key: "deleteWallet" });

  useEffect(() => {
    if (updateWalletFetcher.state === "idle" && updateWalletFetcher.data) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      resetFetcher(updateWalletFetcher);
    }
  }, [updateWalletFetcher.data, updateWalletFetcher.state])

  function getCurrentCategories() {
    const currentCategories = userCategories.map(userCategory => {
      const currentWalletCategory = walletCategories.find(walletCategory => walletCategory.id === userCategory.id);

      return {
        ...userCategory,
        ...currentWalletCategory
      }
    })

    return currentCategories;
  }


  const [settings, setSettings] = useState({
    name,
    currency,
    color,
    categories: getCurrentCategories()
  })

  function updateSettings(newSettings) {
    setSettings(prev => ({
      ...prev,
      ...newSettings
    }))
  }

  const visibleWalletCategories = settings.categories.filter(category => category.isVisible);
  const areAllCategoriesVisible = userCategories.length = visibleWalletCategories.length;

  const settingsDataConfig = [
    {
      formData: {
        name: "name",
        value: settings.name
      },
      field: {
        name: "name",
        props: {
          iconName: "heading",
          type: "input",
          displayValue: formatEntityName(settings.name),
          inputProps: {
            value: formatEntityName(settings.name),
            onChange: (e) => handleWalletNameInputChange({ value: e.target.value, updateState: updateSettings }),
            min: 2,
            max: 50
          }
        },
      }
    },
    {
      formData: {
        name: "currency",
        value: settings.currency
      },
      field: {
        name: "currency",
        props: {
          iconName: "coins-stacked",
          type: "select",
          displayValue: settings.currency,
        },
        modal: {
          type: {
            layout: "fullscreen",
          },
          innerModal: {
            Component: CurrencyModal,
          },
          state: {
            value: settings.currency,
            updateState: (newCurrency) => updateSettings({ currency: newCurrency })
          }
        }
      }
    },
    {
      formData: {
        name: "color",
        value: settings.color
      },
      field: {
        name: "color",
        props: {
          iconName: "paint-roller",
          type: "select",
          displayValue: <div className="size-6 rounded-full" style={{ backgroundColor: settings.color }}></div>,
        },
        modal: {
          type: {
            layout: "fullscreen",
          },
          innerModal: {
            Component: ColorModal,
            props: { colors: walletsColors },
          },
          state: {
            value: settings.color,
            updateState: (newColorCode) => updateSettings({ color: newColorCode })
          }
        }
      }
    },
    {
      formData: {
        name: "categories",
        value: JSON.stringify(settings.categories.map(category => ({ id: category.id, isVisible: category.isVisible })))
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
            props: { categories: settings.categories },
          },
          state: {
            value: settings.categories,
            updateState: (newCategories) => updateSettings({ categories: newCategories })
          },
          minHeight: "min-h-[90%]"
        }
      }
    }
  ]

  return (
    <SettingsSection
      form={{
        fetcher: updateWalletFetcher,
        action: `/app/wallets/${id}`,
        btnValue: "updateWallet"
      }}
      section={{
        title: "Wallet Settings",
        interaction: {
          fetcher: deleteWalletFetcher,
          action: `/app/wallets/${id}`,
          btnValue: "deleteWallet",
          icon: {
            name: "trash-can",
            fill: "fill-red-dark"
          }
        }
      }}
      isSpaceLimited={isSingleColLayout}
      settings={settingsDataConfig}
    />
  )
}
