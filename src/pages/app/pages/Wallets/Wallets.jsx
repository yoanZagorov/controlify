import cn from "classnames";

import { useBreakpoint, useMountTransition } from "@/hooks";
import { WalletsSection } from "@/components/sections/WalletsSection";
import { useLoaderData, useRouteLoaderData } from "react-router-dom";
import { Section } from "@/components/sections/Section";
import { CompactTransactionsSection } from "@/components/sections/CompactTransactionsSection";

export default function Wallets() {
  // const { userData: { wallets } } = useRouteLoaderData("app");
  const { transactions, wallets } = useLoaderData();

  const { isMobile } = useBreakpoint(); // To do: use this value to render and ExpandedTransactionsSection on ml/tab

  return (
    <div className="grid gap-16">
      <WalletsSection
        section={{
          title: "All"
        }}
        wallets={wallets}
      />

      <Section title="Spending" className="">
      </Section>

      <CompactTransactionsSection
        sectionClassName=""
        widget={{
          iconName: "history",
          title: "All"
        }}
        // openModal={}
        transactions={transactions}
      />
    </div>
  )
}
