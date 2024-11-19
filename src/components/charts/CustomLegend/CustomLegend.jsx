import { SvgIcon } from "@/components/SvgIcon";
import { walletsColorMap } from "@/utils/wallet";
import cn from "classnames";
import { formatEntityName } from "@/utils/formatting";

export default function CustomLegend({ payload }) {
  const legendEls = payload.map(entry => {
    const {
      color,
      value,
      payload: { wallet: { iconName, id } }
    } = entry;

    const textClasses = cn(
      "flex items-center gap-1.5 text-sm",
      walletsColorMap.text[color]
    )

    return (
      <li key={id} className={textClasses}>
        <SvgIcon iconName={iconName} className="size-4 fill-current" />
        <span className="text-shadow">{formatEntityName(value)}</span>
      </li>
    )
  })

  return (
    <ul className="flex justify-center flex-wrap gap-x-4 gap-y-2">
      {legendEls}
    </ul>
  );
}
