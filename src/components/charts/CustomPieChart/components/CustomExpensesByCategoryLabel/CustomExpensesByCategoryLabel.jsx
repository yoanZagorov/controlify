import { SvgIcon } from "@/components/SvgIcon";

export default function CustomExpensesByCategoryLabel({ cx, cy, midAngle, outerRadius, name, percent, fill, payload, showChartLabel }) {
  if (percent === 0) return null;

  const RADIAN = Math.PI / 180;

  const iconName = payload.category.iconName;
  const iconLabelMargin = 35;
  const iconSize = 20;

  const wrapperRadius = 20;

  const radiusIconLabel = outerRadius + iconLabelMargin + wrapperRadius;

  const cxWrapper = cx + (radiusIconLabel * Math.cos(-midAngle * RADIAN));
  const cyWrapper = cy + (radiusIconLabel * Math.sin(-midAngle * RADIAN));

  return (
    <>
      {showChartLabel &&
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
      }
    </>
  )
}
