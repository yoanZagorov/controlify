import { Amount } from "@/components/Amount";
import { ContentWidget } from "@/components/widgets/ContentWidget";

export default function WalletWidget({ wallet, className }) {
  const widgetClasses = className ? className : "";

  return (
    <ContentWidget
      iconName={wallet.iconName}
      title={wallet.name}
      className={widgetClasses}
    >
      <Amount
        amount={wallet.balance}
        currency={wallet.currency}
        colorContext="light"
        className="text-lg font-bold"
      />
    </ContentWidget>
  )
}
