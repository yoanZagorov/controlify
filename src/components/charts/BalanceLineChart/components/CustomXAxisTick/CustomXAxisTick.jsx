export default function CustomXAxisTick({ x, y, payload }) {
  return (
    <g>
      <text
        x={x}
        y={y + 16}
        textAnchor="middle"
        className="text-xs font-bold fill-gray-dark"
      >
        {payload.value}
      </text>
    </g>
  )
}

// export default function CustomXAxisTick({ x, y, payload }) {
//   return (
//     <g transform={`translate(${x},${y})`}>
//       <text
//         x={0}
//         y={16}
//         textAnchor="end"
//         className="text-xs font-bold fill-gray-dark -rotate-45"
//       >
//         {payload.value}
//       </text>
//     </g>
//   )
// }