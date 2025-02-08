import { useRouteLoaderData } from "react-router";

import { useLayout, useScrollToTop } from "@/hooks";

import { BalanceSection } from "./sections/BalanceSection";
import { SpendingSection } from "./sections/SpendingSection";

export default function WalletOverview() {
  useScrollToTop();
  const { wallet, openingBalance, chartData } = useRouteLoaderData("wallet");

  const { isSingleColLayout } = useLayout();

  return (
    <div className="grid gap-16 ll:gap-x-20 fhd:gap-x-24">
      <BalanceSection
        isSpaceLimited={isSingleColLayout}
        balance={{
          amount: {
            current: wallet.balance,
            prev: openingBalance
          },
          chartData: chartData.balance
        }}
        currency={wallet.currency}
      />

      <SpendingSection
        isSpaceLimited={isSingleColLayout}
        charts={[
          {
            type: "expensesByCategory",
            data: chartData.expensesByCategory
          },
          {
            type: "expensesVsIncome",
            data: chartData.expensesVsIncome
          }
        ]}
      />
    </div>

  )
}