import { Section } from "../Section";
import { Widget } from "@/components/widgets/Widget";
import { PlusCircleIcon } from "./components/PlusCircleIcon";
import { WalletWidget } from "./components/WalletWidget";

export default function WalletsSection({ section, wallets }) {
  const walletWidgets = wallets.map(wallet => (
    <WalletWidget
      key={wallet.id}
      wallet={wallet}
      className="h-full"
    />
  ))

  return (
    <Section title={section.title} className={section.className || ""}>
      <div className="mt-3 grid grid-cols-2 w-full gap-5">
        {walletWidgets}

        <Widget className="h-full flex flex-col justify-center items-center gap-1.5">
          <h4 className="text-lg font-bold text-navy">Add Wallet</h4>

          <button className="size-12 rounded-full focus:outline-none focus-visible:ring focus-visible:ring-goldenrod">
            <PlusCircleIcon
              className="size-full"
              circleColor="fill-navy"
              plusColor="fill-goldenrod"
            />
          </button>
        </Widget>
      </div>
    </Section>
  )
}
