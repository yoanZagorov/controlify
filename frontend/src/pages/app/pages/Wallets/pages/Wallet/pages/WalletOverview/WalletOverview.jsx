import { useScrollToTop } from "@/hooks";

import { BalanceSection } from "./sections/BalanceSection";
import { SpendingSection } from "./sections/SpendingSection";

export default function WalletOverview() {
  useScrollToTop();

  return (
    <div className="grid gap-16 ll:gap-x-20 fhd:gap-x-24">
      <BalanceSection />
      <SpendingSection />
    </div>
  )
}