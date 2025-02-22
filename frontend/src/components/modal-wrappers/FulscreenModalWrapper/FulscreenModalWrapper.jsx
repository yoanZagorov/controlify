import cn from "classnames"

export default function FulscreenModalWrapper({ isModalOpen, hasTransitioned, layoutProps, modalRef, children }) {
  const layoutPropsConfig = {
    height: "h-max",
    handleOverflow: true,
    ...layoutProps, // Spread here so z-index isn't completely overwritten
    zIndex: {
      overlay: "z-10",
      modal: "z-20",
      ...layoutProps.zIndex
    },
  };

  const classes = {
    overlay: cn(
      "fixed left-0 top-0 h-screen w-screen bg-black transition-opacity duration-300",
      (isModalOpen && hasTransitioned) ? "opacity-50" : "opacity-0",
      layoutPropsConfig.zIndex.overlay,
    ),
    modal: cn(
      // Flexbox used so the modal can use flex-1 and grow to fill the wrapper's height if it has been declared but the modal's content isn't enough to actually fill it
      // On smaller screens, a full-screen modal spans the full width and is stuck to the bottom. On larger, it gets fixed in the center
      // Width: calculate ml breakpoint - the padding
      "fixed left-0 bottom-0 w-screen max-h-[90vh] ml:inset-0 ml:m-auto ml:w-[calc(425px-2*16px)] flex flex-col rounded-t-lg ml:rounded-lg transition-transform duration-300",
      // Defined height is provided if the potential overflow should be handled in a more specific way in the modal itself (so the scroll is applied there)
      // Else h-max is used to center the modal vertically in case it doesn't reach the max-h constraint
      layoutPropsConfig.height,
      layoutPropsConfig.handleOverflow && "overflow-auto",
      !(isModalOpen && hasTransitioned) && "translate-y-[100vh]",
      layoutPropsConfig.zIndex.modal,
    )
  }

  return (
    <>
      <div className={classes.overlay}></div>

      <div ref={modalRef} className={classes.modal} >
        {children}
      </div>
    </>
  )
}
