import { CustomBarChart } from "@/components/charts/CustomBarChart";
import { CustomPieChart } from "@/components/charts/CustomPieChart";
import { Notification } from "@/components/Notification";
import { BalanceSection } from "@/components/sections/BalanceSection";
import { Section } from "@/components/sections/Section";
import { SpendingSection } from "@/components/sections/SpendingSection";
import { ContentWidget } from "@/components/widgets/ContentWidget";
import { Widget } from "@/components/widgets/Widget";
import { useBreakpoint, useLayout } from "@/hooks";
import cn from "classnames";
import { data, useRouteLoaderData } from "react-router";
import { XAxis, YAxis } from "recharts";

export default function WalletOverview() {
  const { wallet, openingBalance, chartData } = useRouteLoaderData("wallet");

  const { isSidebarExpanded } = useLayout();
  const { isMobile, isTablet, isLaptopS } = useBreakpoint(); // To do: use this value to render and ExpandedTransactionsSection on ml/tab
  const isSingleColLayout = isMobile || isTablet || (isLaptopS && isSidebarExpanded);

  const classes = {
    grid: cn(
      "grid gap-16 ll:gap-x-20 fhd:gap-x-24 grid-cols-1",
      // isSingleColLayout
      //   ? "grid-cols-1"
      //   : "grid-cols-12 gap-x-12",
    ),
    gridItem: cn(
      isSingleColLayout ? "" : ""
    )
  }

  return (
    <div className={classes.grid}>
      <BalanceSection
        section={{
          title: "Wallet Balance",
          className: classes.gridItem
        }}
        balance={{
          amount: {
            current: wallet.balance,
            prev: openingBalance
          },
          amountWidgetType: "carousel",
          chartData: chartData.balance
        }}
        currency={wallet.currency}
      />

      <SpendingSection
        type="carousel"
        section={{
          title: "Wallet Spending",
          subtitle: "Last 30 Days",
          className: classes.gridItem
        }}
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

      {/* <ContentWidget iconName="categories" title="expenses vs income">
        <div className="mx-auto h-48">
          <CustomBarChart
            data={chartData.expensesVsIncome}
            currency={wallet.currency}
          />
        </div>
      </ContentWidget> */}
    </div >

  )
}