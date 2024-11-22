import { SvgIcon } from "@/components/SvgIcon";
import { walletsColorMap } from "@/utils/wallet";
import cn from "classnames";
import { formatEntityName } from "@/utils/formatting";
import { categoryColorsMap } from "@/utils/category";

export default function CustomLegend({ payload, entity }) {
  const legendEls = payload.map(entry => {
    const {
      color,
      value,
      payload: { [entity]: { iconName, id } }
    } = entry;

    const iconClasses = cn(
      "size-4",
      entity === "wallet"
        ? walletsColorMap.fill[color]
        : categoryColorsMap.fill[color]
    )

    return (
      <li key={id} className="flex items-center gap-1.5 text-sm text-gray-dark">
        <SvgIcon iconName={iconName} className={iconClasses} />
        <span className="font-semibold">{formatEntityName(value)}</span>
      </li>
    )
  })

  return (
    <ul className="mt-4 flex justify-center flex-wrap gap-x-4 gap-y-2">
      {legendEls}
    </ul>
  );
}
