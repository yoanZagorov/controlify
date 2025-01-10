import { formatEntityName } from "@/utils/formatting";

import { SvgIcon } from "@/components/SvgIcon";

export default function CustomLegend({ payload, entity }) {
  const legendEls = payload.map(entry => {
    const {
      color,
      value,
      payload: { [entity]: { iconName, id } }
    } = entry;

    return (
      <li key={id} className="flex items-center gap-1.5 text-sm text-gray-dark">
        <SvgIcon iconName={iconName} className="size-4" fill={color} />
        <span className="font-semibold" style={{ color }}>{formatEntityName(value)}</span>
      </li>
    )
  })

  return (
    <ul className="mt-4 flex justify-center flex-wrap gap-x-4 gap-y-2">
      {legendEls}
    </ul>
  );
}
