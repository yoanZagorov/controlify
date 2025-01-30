import { SvgIcon } from "@/components/SvgIcon";
import { useBreakpoint } from "@/hooks";

export default function CustomExpensesByCategoryLabel({ cx, cy, midAngle, outerRadius, percent, fill, payload }) {
  const { isMobileS, isMobileM } = useBreakpoint();

  if (percent === 0) return null;

  const RADIAN = Math.PI / 180;

  const iconName = payload.category.iconName;

  const lineLength =
    isMobileS ? 20
      : isMobileM ? 22.5
        : 25;

  const wrapperRadius =
    isMobileS ? 14
      : isMobileM ? 18
        : 22;


  const iconLabelMargin = 10;
  const radiusIconLabel = outerRadius + lineLength + wrapperRadius + iconLabelMargin;

  const cxWrapper = cx + (radiusIconLabel * Math.cos(-midAngle * RADIAN));
  const cyWrapper = cy + (radiusIconLabel * Math.sin(-midAngle * RADIAN));

  const iconSize = wrapperRadius;

  return (
    <>
      <circle
        cx={cxWrapper}
        cy={cyWrapper}
        r={wrapperRadius}
        fill={fill}
      >
      </circle>
      <SvgIcon
        iconName={iconName}
        x={cxWrapper - (0.5 * iconSize)}
        y={cyWrapper - (0.5 * iconSize)}
        width={iconSize}
        height={iconSize}
        className="fill-gray-light"
      />
    </>
  )
}
