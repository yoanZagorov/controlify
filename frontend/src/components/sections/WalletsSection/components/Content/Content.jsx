import cn from "classnames";
import { Link, useLocation } from "react-router"

import { useBreakpoint } from "@/hooks";

import { Section } from "@/components/sections/Section";
import { Widget } from "@/components/widgets/Widget";
import { WalletWidget } from "../WalletWidget"
import { PlusCircleIcon } from "../PlusCircleIcon";

export default function Content({ wallets, section, openModal }) {
  const { isMobileS } = useBreakpoint();

  const walletWidgets = wallets.map(wallet => (
    <Link
      key={wallet.id}
      to={`/app/wallets/${wallet.id}`}
      data-actionable="true"
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
              data-actionable="true"
            >
              <PlusCircleIcon
                className="size-full"
                circleColor="fill-navy"
                plusColor="fill-goldenrod"
              />
            </button>
          </Widget>
        </div>
      </Section>
    </>
  )
}