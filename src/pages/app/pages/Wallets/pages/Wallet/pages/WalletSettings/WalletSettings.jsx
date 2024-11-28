import { SettingsSection } from "@/components/sections/SettingsSection";
import { formatEntityName } from "@/utils/formatting";
import { walletsColorMap } from "@/utils/wallet";
import { useRouteLoaderData } from "react-router";

export default function WalletSettings() {
  const { wallet } = useRouteLoaderData("wallet");
  const { userData: { categories } } = useRouteLoaderData("app"); // To do: create a visibleCategories collection on the wallet itself

  return (
    <SettingsSection
      section={{
        title: "Wallet Settings"
      }}
      settings={[
        {
          type: "input",
          iconName: "heading",
          title: "name",
          defaultValue: formatEntityName(wallet.name)
        },
        {
          type: "select",
          iconName: "coins-stacked",
          title: "currency",
          defaultValue: wallet.currency
        },
        {
          type: "select",
          iconName: "paint-roller",
          title: "color",
          defaultValue: <div className={`size-6 rounded-full ${walletsColorMap.background[wallet.color]}`}></div>
        },
        {
          type: "select",
          iconName: "categories",
          title: "categories",
          defaultValue: categories.length
        },
      ]}
    />
  )
}
