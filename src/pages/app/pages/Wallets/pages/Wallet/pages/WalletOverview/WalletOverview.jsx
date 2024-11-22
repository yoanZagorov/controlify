import { CustomPieChart } from "@/components/charts/CustomPieChart";
import { BalanceSection } from "@/components/sections/BalanceSection";
import { Section } from "@/components/sections/Section";
import { ContentWidget } from "@/components/widgets/ContentWidget";
import { useRouteLoaderData } from "react-router-dom";

export default function WalletOverview() {
  const { wallet, balanceChartData, expensesByCategoryChartData } = useRouteLoaderData("wallet");

  return (
    <div>

      <BalanceSection
        section={{
          title: "Wallet Balance",
          className: "mt-12"
        }}
        balance={{
          amount: wallet.balance,
          chartData: balanceChartData
        }}
        currency={wallet.currency}
      />

      <Section
        title="Wallet Spending"
        className="mt-10"
        contentClassName="mt-3"
      >
        <div className="flex gap-3 text-navy-dark opacity-50 font-semibold">
          <button>{"<"}</button>
          <span>Last 30 Days</span>
          <button>{">"}</button>
        </div>

        <ContentWidget
          iconName="categories"
          title="by category"
          className="mt-6"
        >
          <div className="mx-auto h-80 mm:h-[420px]">
            <CustomPieChart
              type="expensesByCategory"
              data={expensesByCategoryChartData}
            />
          </div>
        </ContentWidget>
      </Section>
    </div>

  )
}