import { Carousel } from "@/components/Carousel";
import { Section } from "@/components/sections/Section";
import { useLayout } from "@/hooks";
import cn from "classnames";

export default function OverviewSection({ sectionProps, charts }) {
  const { isSingleColLayout } = useLayout();

  const chartsDataConfig = {
    financialScore: {
      check: (chartData) => chartData.length ? true : false,
      widget: {
        iconName: "gauge",
        title: "financial score"
      },
      Component: CustomGaugeChart,
      data: chartsData.financialScore,
      className: cn(!isSingleColLayout && "cols-span-1")
    },
    balance: {
      check: (chartData) => chartData.find(entry => entry.amount) ? true : false,
      widget: {
        iconName: "scale",
        title: "balance"
      },
      Component: CustomWaterfallChart,
      data: chartsData.balance,
      className: cn(!isSingleColLayout && "cols-span-2")
    },
  };

  const chartEls = charts.map((chart, index) => {
    const { check, widget, Component } = chartsDataConfig[chart.type];

    const hasSufficientData = check(chart.data);

    return (
      <ContentWidget key={index} iconName={widget.iconName} title={widget.title} className="w-full">
        {hasSufficientData ? (
          <div className="h-450px">
            <Component type={chart.type} data={chart.data} />
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

  const carouselItems = isSpaceLimited ? charts.map((_, index) => ({ component: chartEls[index] })) : null;


  return (
    <Section
      title="Overview"
      subtitle={period}
      {...sectionProps}
    >
      {isSpaceLimited ? (
        <Carousel items={carouselItems} />
      ) : (
        <div className="flex gap-6">
          {chartEls}
        </div>
      )}

    </Section>
  )
}