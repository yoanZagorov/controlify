import cn from "classnames"
import { forwardRef } from "react"

const ModalWrapper = forwardRef(function ModalWrapper({ type = "fullscreen", isModalOpen, hasTransitioned, modalHeight = "h-full", children }, ref) {
  const isNested = type === "nested";

  const classes = {
    base: cn(
      "left-0 rounded-t-lg ml:rounded-lg duration-300",
      isNested ? "absolute w-full" : "fixed"
    ),
    overlay: function () { // turned to method, in order to access the base property
      return cn(
        this.base,
        "top-0 z-20 transition-opacity",
        isNested ? "bg-white h-full" : "h-screen w-screen bg-black",
        (isModalOpen && hasTransitioned) ? "opacity-50" : "opacity-0"
      )
    },
    modal: function () { // turned to method, in order to access the modal property 
      return cn(
        this.base,
        "bottom-0 rounded-t-lg bg-gray-light transition-transform z-30", // calc - ml breakpoint - padding
        isNested ? modalHeight : "h-[90%] w-full ml:w-[calc(425px-2*16px)] ml:inset-0 ml:m-auto",
        !(isModalOpen && hasTransitioned) && "translate-y-[100vh]"
      )
    },
  }
  return (
    <>
      <div className={classes.overlay()}></div>

      <div ref={ref} className={classes.modal()}>
        {children}
      </div>
    </>
  )
})

export default ModalWrapper;