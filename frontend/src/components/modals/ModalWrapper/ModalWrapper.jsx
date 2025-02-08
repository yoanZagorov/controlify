import cn from "classnames"
import { forwardRef } from "react"

const ModalWrapper = forwardRef(function ModalWrapper({ type, isModalOpen, hasTransitioned, minHeight, zIndex, children }, ref) {
  const modalWrapperConfig = {
    type: {
      layout: "fullscreen",
      blocking: true,
      ...type
    },
    minHeight: minHeight || "min-h-0",
    zIndex: {
      overlay: "z-10",
      modal: "z-20",
      ...zIndex
    },
  }

  const isNested = modalWrapperConfig.type.layout === "nested";
  const isBlocking = modalWrapperConfig.type.blocking;

  const sharedClasses = cn(
    "left-0 duration-300",
    isNested ? "absolute w-full" : "fixed"
  )

  const classes = {
    overlay: cn(
      sharedClasses,
      "top-0 transition-opacity",
      modalWrapperConfig.zIndex.overlay,
      isNested ? "h-full rounded-t-lg ml:rounded-lg" : "h-screen w-screen",
      isBlocking ? "bg-black" : "bg-white",
      (isModalOpen && hasTransitioned)
        ? isBlocking ? "opacity-50" : "opacity-30"
        : "opacity-0"
    ),
    modal: cn(
      sharedClasses,
      // flexbox needed for the overflow of the modal itself to work + for nested modals to feel the full height 
      "bottom-0 flex flex-col rounded-t-lg ml:rounded-lg transition-transform",
      modalWrapperConfig.zIndex.modal,
      isNested
        ? "max-h-[75%]"
        : cn(
          // On smaller screens, a full-screen modal spans the full width. On larger, it gets fixed in the center
          `w-full max-h-[90%] ml:w-[calc(425px-2*16px)] ml:inset-0 ml:m-auto`, // width: calculate ml breakpoint - the padding
          !isBlocking && "ml:h-fit"
        ),
      minHeight,
      !(isModalOpen && hasTransitioned) && "translate-y-[100vh]"
    )
  }

  return (
    <>
      <div className={classes.overlay}></div>

      <div ref={ref} className={classes.modal}>
        {children}
      </div>
    </>
  )
})

export default ModalWrapper;