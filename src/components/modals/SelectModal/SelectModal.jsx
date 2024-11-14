import cn from "classnames";

import { capitalize } from "@/utils/str";

export default function SelectModal({ name, modalHeight, closeModal, isSelectModalOpen, hasTransitioned, children }) {
  const classes = {
    modal: "fixed left-0 w-full transition-[bottom,opacity] duration-300",
    overlay: function () {
      return cn(
        this.modal,
        "top-0 h-screen bg-gray-light z-30",
        (isSelectModalOpen && hasTransitioned) ? "opacity-30" : "opacity-0"
      )
    },
    selectModal: function () {
      return cn(
        this.modal,
        "p-4 border-t border-gray-dark rounded-t-lg bg-gray-medium z-40",
        modalHeight,
        (isSelectModalOpen && hasTransitioned) ? "bottom-0" : "-bottom-full"
      )
    }
  }

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeModal}
        className={classes.overlay()}>
      </div>

      {/* Modal */}
      <div className={classes.selectModal()}>
        <span className="text-gray-dark font-semibold">Select {capitalize(name)}</span>
        {children}
      </div>
    </>
  )
}
