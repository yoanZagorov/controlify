import { SvgIcon } from '#/components/SvgIcon'

export default function CustomIconLabel({
  size,
  cx,
  cy,
  midAngle,
  outerRadius,
  percent,
  fill,
  payload,
}) {
  if (percent === 0) return null // Nothing to render

  // Constants
  const RADIAN = Math.PI / 180
  const ICON_LABEL_MARGIN = 10

  // Maps
  const lineLengths = {
    s: 20,
    m: 22.5,
    l: 25,
  }

  const wrapperRadii = {
    s: 14,
    m: 18,
    l: 22,
  }

  const radiusIconLabel =
    outerRadius + lineLengths[size] + wrapperRadii[size] + ICON_LABEL_MARGIN

  const cxWrapper = cx + radiusIconLabel * Math.cos(-midAngle * RADIAN)
  const cyWrapper = cy + radiusIconLabel * Math.sin(-midAngle * RADIAN)

  const iconSize = wrapperRadii[size]

  return (
    <>
      <circle
        cx={cxWrapper}
        cy={cyWrapper}
        r={wrapperRadii[size]}
        fill={fill}
      ></circle>
      <SvgIcon
        iconName={payload['details'].iconName}
        x={cxWrapper - 0.5 * iconSize}
        y={cyWrapper - 0.5 * iconSize}
        width={iconSize}
        height={iconSize}
        className="fill-gray-light"
      />
    </>
  )
}
