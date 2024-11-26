import { ContentWidget } from "@/components/widgets/ContentWidget";
import { Section } from "../Section";
import { CustomPieChart } from "@/components/charts/CustomPieChart";
import { Widget } from "@/components/widgets/Widget";
import { Notification } from "@/components/Notification";
import { Carousel } from "@/components/Carousel";
import { CustomBarChart } from "@/components/charts/CustomBarChart";

export default function SpendingSection({ type = "single", section, charts }) {
  // const hasData =
  //   chart.type === "expensesByWallet" ? chart.data.find(entry => entry !== null) ? true : false
  //     : chart.type === "expensesByCategory" ? chart.data.length ? true : false
  //       : chart.data.find(entry => entry.amount) ? true : false;


  // To do: turn the charts into an array and create a loop to check the data for each chart

  const isCarousel = type === "carousel";

  const chartsData = {
    expensesByWallet: {
      check: (chart) => chart.data.find(entry => entry !== null) ? true : false,
      widget: {
        iconName: "wallet",
        title: "by wallet"
      },
      componentWrapperClassName: "mx-auto h-72 mm:h-96",
      Component: CustomPieChart
    },
    expensesByCategory: {
      check: (chart) => chart.data.length ? true : false,
      widget: {
        iconName: "categories",
        title: "by category"
      },
      componentWrapperClassName: "mx-auto h-80 mm:h-[420px]",
      Component: CustomPieChart
    },
    expensesVsIncome: {
      check: (chart) => chart.data.find(entry => entry.amount) ? true : false,
      widget: {
        iconName: "wallet",
        title: "expenses vs income"
      },
      componentWrapperClassName: "mx-auto h-80 mm:h-[420px]",
      Component: CustomBarChart
    },
  };

  const chartEls = charts.map((chart, index) => {
    const { check, widget, componentWrapperClassName, Component } = chartsData[chart.type];

    const hasSufficientData = check(chart);

    return (
      <ContentWidget key={index} iconName={widget.iconName} title={widget.title}>
        {hasSufficientData ? (
          <div className={componentWrapperClassName}>
            <Component
              type={chart.type}
              data={chart.data}
            />
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

  const carouselItems = isCarousel ? charts.map((chart, index) => ({
    name: chart.type,
    component: chartEls[index]
  })) : null;

  return (
    <Section
      title={section.title}
      subtitle={section.subtitle}
      className={section.className}
      contentClassName="mt-3"
    >
      {/* {hasData ? (
        <ContentWidget iconName={widget.iconName} title={widget.title}>
          <div className="mx-auto h-80 mm:h-[420px]">
            <CustomPieChart
              type={chart.type}
              data={chart.data}
            />
          </div>
        </ContentWidget>
      ) : (
        <Widget>
          <Notification className="max-w-64 mx-auto">
            Not enough data available to create the chart yet. Add a few transactions to get started!
          </Notification>
        </Widget>
      )} */}

      {isCarousel ? (
        <Carousel items={carouselItems} />
      ) : chartEls}
    </Section>
  )
}
