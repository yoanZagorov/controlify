import { CustomPieChart } from "@/components/charts/CustomPieChart";
import { BalanceSection } from "@/components/sections/BalanceSection";
import { Section } from "@/components/sections/Section";
import { ContentWidget } from "@/components/widgets/ContentWidget";
import { useBreakpoint, useLayout } from "@/hooks";
import cn from "classnames";
import { useRouteLoaderData } from "react-router";

export default function WalletOverview() {
  const { wallet, balanceThirtyDaysAgo, balanceChartData, expensesByCategoryChartData } = useRouteLoaderData("wallet");

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
            prev: balanceThirtyDaysAgo
          },
          amountWidgetType: "carousel",
          chartData: balanceChartData
        }}
        currency={wallet.currency}
      />

      <Section
        title="Wallet Spending"
        className={classes.gridItem}
        contentClassName="mt-3"
      >
        {/* <div className="flex gap-3 text-navy-dark opacity-50 font-semibold">
          <button>{"<"}</button>
          <span>Last 30 Days</span>
          <button>{">"}</button>
        </div> */}

        <ContentWidget
          iconName="categories"
          title="by category"
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