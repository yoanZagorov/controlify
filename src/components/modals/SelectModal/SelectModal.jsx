import cn from "classnames";

import { capitalize } from "@/utils/str";
import { useOutsideClick } from "@/hooks";

export default function SelectModal({ name, modalHeight, contentMaxW, closeModal, isSelectModalOpen, hasTransitioned, children }) {
  const selectModalRef = useOutsideClick(isSelectModalOpen, closeModal);

  const classes = {
    modal: "absolute left-0 w-full rounded-lg transition-[bottom,opacity] duration-300",
    overlay: function () {
      return cn(
        this.modal,
        "top-0 h-full bg-gray-light z-30",
        (isSelectModalOpen && hasTransitioned) ? "opacity-30" : "opacity-0"
      )
    },
    selectModal: function () {
      return cn(
        this.modal,
        "p-4 border-t border-gray-dark rounded-t-lg bg-gray-medium z-40 overflow-auto",
        modalHeight,
        (isSelectModalOpen && hasTransitioned) ? "bottom-0" : "-bottom-full"
      )
    }
  }

  return (
    <>
      {/* Overlay */}
      <div
        // onClick={closeModal}
        className={classes.overlay()}>
      </div>

      {/* Modal */}
      <div ref={selectModalRef} className={classes.selectModal()}>
        <div className={`mx-auto ${contentMaxW}`}>
          <span className="text-gray-dark font-semibold">Select {capitalize(name)}</span>
          {children}
        </div>
      </div>
    </>
  )
}
