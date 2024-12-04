import cn from "classnames";

import { capitalize } from "@/utils/str";

export default function SelectModal({ type = "fullscreen", name, contentMaxW = "", children }) {
  const isNested = type === "nested";

  const modalClassName = cn(
    "w-full h-full p-4 border border-gray-dark rounded-t-lg ml:rounded-lg bg-gray-medium overflow-auto",
    isNested ? "" : "bottom-0",
  )

  return (
    <div className={modalClassName}>
      <div className={`mx-auto ${contentMaxW}`}>
        <span className="text-gray-dark font-semibold">Select {capitalize(name)}</span>
        {children}
      </div>
    </div>
  )
}
