import { SettingsSection } from "@/components/sections/SettingsSection";
import { formatEntityName } from "@/utils/formatting";
import { walletsColorMap } from "@/utils/wallet";
import { useState } from "react";
import { useRouteLoaderData } from "react-router";

export default function WalletSettings() {
  const { wallet: { id, name, currency, color } } = useRouteLoaderData("wallet");
  const { userData: { categories } } = useRouteLoaderData("app"); // To do: create a visibleCategories collection on the wallet itself

  const [settings, setSettings] = useState({
    name,
    currency,
    color,
    categories
  })

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
        title: "Wallet Settings"
      }}
      settings={[
        {
          name: "name",
          type: "input",
          iconName: "heading",
          valueData: {
            value: settings.name,
            displayValue: formatEntityName(settings.name)
          }
        },
        {
          name: "currency",
          type: "select",
          iconName: "coins-stacked",
          valueData: {
            value: settings.currency,
            displayValue: settings.currency
          }
        },
        {
          name: "color",
          type: "select",
          iconName: "paint-roller",
          valueData: {
            value: settings.color,
            displayValue: <div className={`size-6 rounded-full ${walletsColorMap.background[settings.color]}`}></div>
          }
        },
        {
          name: "categories",
          type: "select",
          iconName: "categories",
          valueData: {
            value: JSON.stringify(settings.categories.map(category => category.id)),
            displayValue: settings.categories.length
          }
        },
      ]}
    />
  )
}
