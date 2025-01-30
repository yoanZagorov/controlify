import { Legend, Pie, PieChart, ResponsiveContainer } from "recharts";

import { useBreakpoint } from "@/hooks";

import { CustomExpensesByWalletLabel } from "./components/CustomExpensesByWalletLabel";
import { CustomLabelLine } from "./components/CustomLabelLine";
import { CustomLegend } from "./components/CustomLegend";
import { CustomExpensesByCategoryLabel } from "./components/CustomExpensesByCategoryLabel";

export default function CustomPieChart({ type, data }) {
  const { isMobileS, isMobileM } = useBreakpoint();

  const isExpensesByWallet = type === "expensesByWallet";

  const outerRadius =
    isMobileS ? 55
      : isMobileM ? 65
        : 75;

  return (
    <ResponsiveContainer className="w-full h-full">
      <PieChart>
        <Pie
          data={data}
          dataKey="amount"
          outerRadius={outerRadius}
          label={isExpensesByWallet
            ? <CustomExpensesByWalletLabel showChartLabel={!isMobileS} />
            : <CustomExpensesByCategoryLabel />
          }
          labelLine={!(isExpensesByWallet && isMobileS) && <CustomLabelLine isExpensesByWallet={isExpensesByWallet} />}
        />
        <Legend
          wrapperStyle={{ width: "100%", left: "50%", transform: "translateX(-50%)" }}
          content={<CustomLegend entity={isExpensesByWallet ? "wallet" : "category"} />}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
