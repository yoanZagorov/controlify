export default function Needle({ value, data, cx, cy, innerRadius, outerRadius, color }) {
  const RADIAN = Math.PI / 180;

  const total = data.reduce((acc, section) => acc += section.value, 0);

  const ang = 180 * (1 - value / total);
  const length = (innerRadius + 2 * outerRadius) / 3;
  const sin = Math.sin(-RADIAN * ang);
  const cos = Math.cos(-RADIAN * ang);
  const circleRadius = 5;

  const x0 = cx;
  const y0 = cy;
  const xBasePointA = x0 + circleRadius * sin;
  const yBasePointA = y0 - circleRadius * cos;
  const xBasePointB = x0 - circleRadius * sin;
  const yBasePointB = y0 + circleRadius * cos;
  const xEndPoint = x0 + length * cos;
  const yEndPoint = y0 + length * sin;

  return [
    <circle cx={x0} cy={y0} r={circleRadius} fill={color} />,
    <path d={`M${xBasePointA} ${yBasePointA}L${xBasePointB} ${yBasePointB} L${xEndPoint} ${yEndPoint} L${xBasePointA} ${yBasePointA}`} fill={color} />,
  ]
}