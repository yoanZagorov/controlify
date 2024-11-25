import { capitalize } from "@/utils/str";

export default function CustomLabel(props) {
  const { x, y, name } = props;

  const barTopMargin = 15;

  console.log(props);
  return (
    <text className="text-gray-dark font-semibold" x={x} y={y - barTopMargin}>{capitalize(name)}</text>
  )
}
