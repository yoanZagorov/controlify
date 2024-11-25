import { Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import { CustomExpensesByWalletLabel } from "./components/CustomExpensesByWalletLabel";
import { CustomLabelLine } from "./components/CustomLabelLine";
import { CustomLegend } from "./components/CustomLegend";
import { useBreakpoint } from "@/hooks";
import { CustomExpensesByCategoryLabel } from "./components/CustomExpensesByCategoryLabel";

export default function CustomPieChart({ type, data }) {
  const { isMobileS, isMobileM } = useBreakpoint();

  const isExpensesByWallet = type === "expensesByWallet";

  return (
    <ResponsiveContainer className="w-full h-full">
      <PieChart>
        <Pie
          data={data}
          dataKey="amount"
          outerRadius={(isExpensesByWallet && isMobileM) ? 70 : 75}
          label={isExpensesByWallet
            ? <CustomExpensesByWalletLabel showChartLabel={!isMobileS} />
            : <CustomExpensesByCategoryLabel showChartLabel={!isMobileS} />
          }
          labelLine={!isMobileS && <CustomLabelLine />}
        />
        <Legend
          wrapperStyle={{ width: "100%", left: "50%", transform: "translateX(-50%)" }}
          content={<CustomLegend entity={isExpensesByWallet ? "wallet" : "category"} />}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
