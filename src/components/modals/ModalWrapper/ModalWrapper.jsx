import cn from "classnames"
import { forwardRef } from "react"

const ModalWrapper = forwardRef(function ModalWrapper({ type = {}, isModalOpen, hasTransitioned, minHeight = "min-h-0", zIndex = { overlay: "z-10", modal: "z-20" }, children }, ref) {
  const typeProps = { layout: "fullscreen", blocking: true, ...type }; // provide default values that don't get overwritten if only one value is provided

  const isNested = typeProps.layout === "nested";
  const isBlocking = typeProps.blocking;

  const classes = {
    base: cn(
      "left-0 duration-300 ml:rounded-lg",
      isNested ? "absolute w-full" : "fixed"
    ),
    overlay: function () { // turned to method, in order to access the base property
      return cn(
        this.base,
        "top-0 transition-opacity",
        zIndex.overlay,
        isNested ? "h-full" : "h-screen w-screen",
        isBlocking ? "bg-black" : "bg-white",
        (isModalOpen && hasTransitioned)
          ? isBlocking ? "opacity-50" : "opacity-30"
          : "opacity-0"
      )
    },
    modal: function () { // turned to method, in order to access the base property 
      return cn(
        this.base,
        "bottom-0 flex flex-col rounded-t-lg transition-transform", // calc - ml breakpoint - padding
        zIndex.modal,
        isNested
          ? "max-h-[75%]"
          : cn(
            "w-full ml:w-[calc(425px-2*16px)] ml:inset-0 ml:m-auto",
            !isBlocking && "ml:h-fit"
          ),
        isBlocking ? "h-[90%]" : minHeight,
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