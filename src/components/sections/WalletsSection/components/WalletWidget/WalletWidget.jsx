import { formatEntityName } from "@/utils/formatting";

import { Amount } from "@/components/Amount";
import { ContentWidget } from "@/components/widgets/ContentWidget";

export default function WalletWidget({ wallet, className }) {
  return (
    <ContentWidget
      iconName={wallet.iconName}
      title={formatEntityName(wallet.name)}
      className={className ? className : ""}
      content={{ hasBackground: false }}
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
