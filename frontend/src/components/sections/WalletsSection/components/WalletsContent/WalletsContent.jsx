import cn from "classnames";
import { Link } from "react-router"

import { useBreakpoint } from "@/hooks";

import { Section } from "@/components/sections/Section";
import { Widget } from "@/components/widgets/Widget";
import { SvgIcon } from "@/components/SvgIcon";
import { WalletWidget } from "../WalletWidget"

// Handles the UI display for the WalletSection
export default function WalletsContent({ wallets, section, openModal }) {
  const { isMobileS } = useBreakpoint();

  const walletWidgets = wallets.map(wallet => (
    <Link
      key={wallet.id}
      to={`/app/wallets/${wallet.id}`}
      data-actionable={true}
    >
      <WalletWidget
        wallet={wallet}
        className="h-full"
      />
    </Link>
  ))

  const gridClasses = cn(
    "grid w-full gap-5",
    !isMobileS && "grid-cols-2"
  )

  return (
    <>
      <Section {...section}>
        <div className={gridClasses}>
          {walletWidgets}

          <Widget className="h-full flex flex-col justify-center items-center gap-1.5">
            <h4 className="text-lg font-bold text-navy">Add Wallet</h4>

            <button
              onClick={openModal}
              className="size-12 rounded-full focus:outline-none focus-visible:ring focus-visible:ring-goldenrod"
              data-actionable={true}
            >
              <SvgIcon iconName="plus-circle" />
            </button>
          </Widget>
        </div>
      </Section>
    </>
  )
}