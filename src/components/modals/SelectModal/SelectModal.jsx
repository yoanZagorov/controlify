import cn from "classnames";

import { capitalize } from "@/utils/str";

export default function SelectModal({ name, modalHeight, closeModal, isSelectModalOpen, hasTransitioned, children }) {
  const baseModalClasses = "fixed left-0 w-screen transition-[bottom opacity] duration-300";

  const overlayClasses = cn(
    "top-0 h-screen bg-gray-light z-30",
    baseModalClasses,
    (isSelectModalOpen && hasTransitioned) ? "opacity-30" : "opacity-0"
  )

  const selectModalClasses = cn(
    modalHeight,
    "p-4 border-t border-gray-dark rounded-t-lg bg-gray-medium z-40",
    baseModalClasses,
    (isSelectModalOpen && hasTransitioned) ? "bottom-0" : "-bottom-full"
  )

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeModal}
        className={overlayClasses}>
      </div>

      {/* Modal */}
      <div className={selectModalClasses}>
        <span className="text-gray-dark font-semibold">Select {capitalize(name)}</span>
        {children}
      </div>
    </>
  )
}
