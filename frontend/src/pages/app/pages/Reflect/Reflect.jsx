import { useScrollToTop } from "@/hooks";
import { OverviewSection } from "./sections/OverviewSection";
import { CashFlowSection } from "./sections/CashFlowSection";

export default function Reflect() {
  useScrollToTop();

  return (
    <div>
      <OverviewSection />
      <CashFlowSection className="mt-12" />
    </div>
  )
}