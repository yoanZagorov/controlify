import { capitalize } from "@/utils/generic";

export default function Transaction({ type, category, wallet, amount, currency }) {
  const isExpense = type === "expense";

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2.5">
        {category.icon}
        <div className="flex flex-col">
          <p className="text-navy text-sm ml:max-tab:text-base ls:text-base font-semibold">{capitalize(category.name)}</p>
          <div className="-mt-0.5 flex items-center gap-1 ml:max-tab:gap-1.5 ls:gap-1.5">
            {wallet.icon} <p className="text-xs ml:max-tab:text-sm ls:text-sm text-navy opacity-50 font-bold">{capitalize(wallet.name)}</p>
          </div>
        </div>
      </div>

      <p className={`ml-auto ml:max-tab:text-lg ls:text-lg font-semibold ${isExpense ? "text-red-dark" : "text-green-light"}`}>{isExpense ? "-" : "+"}{amount} {currency}</p>
    </div>
  )
}