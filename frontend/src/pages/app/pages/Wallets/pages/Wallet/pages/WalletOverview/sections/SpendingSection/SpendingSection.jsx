import { ContentWidget } from "@/components/widgets/ContentWidget";
import { Section } from "@/components/sections/Section";
import { Notification } from "@/components/Notification";
import { Carousel } from "@/components/Carousel";
import { CustomBarChart } from "@/components/charts/CustomBarChart";
import { CustomPieChartWithIconLabels } from "@/components/charts/pie-charts/CustomPieChartWithIconLabels";

export default function SpendingSection({ isSpaceLimited, charts }) {
  const chartsData = {
    expensesByCategory: {
      check: (chartData) => chartData.length ? true : false,
      widget: {
        iconName: "categories",
        title: "by category"
      },
      componentWrapperClassName: "h-[450px]",
      Component: CustomPieChartWithIconLabels
    },
    expensesVsIncome: {
      check: (chartData) => chartData.find(entry => entry.amount) ? true : false,
      widget: {
        iconName: "stats",
        title: "expenses vs income"
      },
      componentWrapperClassName: "h-[450px]",
      Component: CustomBarChart
    },
  };

  const chartEls = charts.map((chart, index) => {
    const { check, widget, componentWrapperClassName, Component } = chartsData[chart.type];

    const hasSufficientData = check(chart.data);

    return (
      <ContentWidget key={index} iconName={widget.iconName} title={widget.title} className="w-full">
        {hasSufficientData ? (
          <div className={componentWrapperClassName}>
            <Component data={chart.data} />
          </div>
        ) : (
          <Notification className="max-w-64 mx-auto">
            Not enough data available to create the chart yet. Add a few transactions to get started!
          </Notification>
        )
        }
      </ContentWidget>
    )
  })

  // const carouselItems = isSpaceLimited ? charts.map((_, index) => ({ component: chartEls[index] })) : null;

  return (
    <Section
      title="Wallet Spending"
      subtitle="Last 30 Days"
    >
      {isSpaceLimited ? (
        <Carousel items={chartEls} />
      ) : (
        <div className="flex gap-6">
          {chartEls}
        </div>
      )}
    </Section>
  )
}
