import { Carousel } from "@/components/Carousel";
import { Section } from "@/components/sections/Section";
import { ContentWidget } from "@/components/widgets/ContentWidget";
import { HeaderContentWidget } from "@/components/widgets/HeaderContentWidget";
import { useLayout } from "@/hooks";
import cn from "classnames";

export default function SectionWrapper({ variant = "default", sectionProps, items }) {
  const { isSingleColLayout } = useLayout();
  const isHeadered = variant === "headered";

  const period = "Last 30 Days";

  const elements = items.map((item, index) => {
    return isHeadered ? (
      <HeaderContentWidget
        key={`item-${index}`}
        contentWidget={{
          props: {
            iconName: item.iconName,
            title: item.title
          },
          content: item.headerContent
        }}
        widgetContent={
          <div className="p-4 bg-gray-light h-56 rounded-md">
            {item.ChartComponent}
          </div>
        }
        className={cn(item.className)}
      />
    ) : (
      <ContentWidget
        key={`item-${index}`}
        iconName={item.iconName}
        title={item.title}
        className={cn(item.className)}
      >
        <div className="p-4 bg-gray-light h-56 rounded-md">
          {item.ChartComponent}
        </div>
      </ContentWidget>
    )
  })

  return (
    <Section
      subtitle={period}
      {...sectionProps}
    >
      {isSingleColLayout ? (
        <Carousel items={elements} />
      ) : (
        <div className="grid gap-12 grid-cols-3">
          {elements}
        </div>
      )}
    </Section>
  )
}