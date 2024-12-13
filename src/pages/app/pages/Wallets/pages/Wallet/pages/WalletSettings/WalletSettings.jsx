import { CategoriesVisibilityModal } from "@/components/modals/CategoriesVisibilityModal";
import { ColorModal } from "@/components/modals/ColorModal";
import { CurrencyModal } from "@/components/modals/CurrencyModal";
import { SettingsSection } from "@/components/sections/SettingsSection";
import { formatEntityName } from "@/utils/formatting";
import { walletsColorMap, walletsColors } from "@/utils/wallet";
import { useEffect, useState } from "react";
import { useRouteLoaderData } from "react-router";

export default function WalletSettings() {
  const { wallet: { id, name, currency, color, categories: walletCategories } } = useRouteLoaderData("wallet");
  const { userData: { categories: userCategories } } = useRouteLoaderData("app");

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
  }) // To do: wallet settings context (eventually)

  // useEffect(() => {
  //   updateSettings({ categories: getCurrentCategories() });
  // }, [settings.categories])

  console.log(settings);

  function updateSettings(newSettings) {
    setSettings(prev => ({
      ...prev,
      ...newSettings
    }))
  }

  return (
    <SettingsSection
      action={`/app/wallets/${id}`}
      section={{
        title: "Wallet Settings",
      }}
      settings={[
        {
          settingWidgetProps: {
            name: "name",
            type: "input",
            iconName: "heading",
            valueData: {
              value: settings.name,
              displayValue: formatEntityName(settings.name)
            },
          }
        },
        {
          settingWidgetProps: {
            name: "currency",
            type: "select",
            iconName: "coins-stacked",
            valueData: {
              value: settings.currency,
              displayValue: settings.currency
            },
          },
          modal: {
            selectModalProps: {
              name: "currency",
            },
            innerModal: {
              Component: CurrencyModal,
            },
            state: {
              value: settings.currency,
              updateState: (newCurrencyName) => updateSettings({ currency: newCurrencyName })
            }
          }
        },
        {
          settingWidgetProps: {
            name: "color",
            type: "select",
            iconName: "paint-roller",
            valueData: {
              value: settings.color,
              displayValue: <div className="size-6 rounded-full" style={{ backgroundColor: settings.color }}></div>
            },
          },
          modal: {
            selectModalProps: {
              name: "color",
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
        },
        {
          settingWidgetProps: {
            name: "categories",
            type: "select",
            iconName: "categories",
            valueData: {
              value: JSON.stringify(settings.categories.map(category => category.id)),
              displayValue: settings.categories.filter(category => category.isVisible).length
            },
          },
          modal: {
            selectModalProps: {
              name: "categories",
            },
            innerModal: {
              Component: CategoriesVisibilityModal,
              props: { categories: settings.categories }
            },
            state: {
              value: settings.categories.length,
              updateState: (newCategories) => updateSettings({ categories: newCategories })
            },
            minHeight: "min-h-[90%]"
          }
        },
      ]}
    />
  )
}
