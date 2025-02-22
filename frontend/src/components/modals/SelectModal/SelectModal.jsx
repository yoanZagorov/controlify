import cn from "classnames";
import { capitalize } from "@/utils/str";

export default function SelectModal({ type = "fullscreen", name, contentMaxWidth = "max-w-none", children }) {
  const isNested = type === "nested";

  const modalClassName = cn(
    "flex-1 w-full p-4 border-t border-gray-dark rounded-t-lg ml:rounded-lg bg-gray-medium overflow-auto", // Handle overflow here, so the "rubber band" iOS effect can look better
    !isNested && "bottom-0 ml:border",
  )

  return (
    <div className={modalClassName}>
      <div className={`mx-auto ${contentMaxWidth}`}>
        <span className="text-gray-dark font-semibold">Select {capitalize(name)}</span>
        <div className="mt-6">
          {children}
        </div>
      </div>
    </div>
  )
}
