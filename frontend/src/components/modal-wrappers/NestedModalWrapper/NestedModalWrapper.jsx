import cn from "classnames"
import { useMemo } from "react";

// See the docs for more info regarding the nested modal implementation
export default function NestedModalWrapper({ isModalOpen, hasTransitioned, layoutProps = {}, parentModalRef, modalRef, children }) {
  const layoutPropsConfig = {
    minHeight: "min-h-0",
    handleOverflow: true,
    ...layoutProps, // Spread here so z-index isn't completely overwritten
    zIndex: {
      overlay: "z-10",
      modal: "z-20",
      ...layoutProps.zIndex
    },
  };
  // Get the current scrolled distance in the parent
  const parentModalScrolledDistance = useMemo(
    () => parentModalRef?.current?.scrollTop,
    [parentModalRef?.current]
  );

  const classes = {
    overlay: cn(
      "absolute top-0 left-0 h-full w-full rounded-t-lg ml:rounded-lg bg-white transition-opacity duration-300", // Counting on relatively-positioned parent modal
      (isModalOpen && hasTransitioned) ? "opacity-30" : "opacity-0",
      layoutPropsConfig.zIndex.overlay,
    ),
    modal: cn(
      // Flexbox used so the modal can use flex-1 and grow to fill the wrapper's height if it has been declared but the modal's content isn't enough to actually fill it
      "absolute left-0 w-full max-h-[75%] flex flex-col transition-transform duration-300",
      layoutPropsConfig.minHeight,
      layoutPropsConfig.handleOverflow && "overflow-auto",
      !(isModalOpen && hasTransitioned) && "translate-y-[100vh]",
      layoutPropsConfig.zIndex.modal,
    )
  }

  return (
    <>
      <div className={classes.overlay}></div>

      <div ref={modalRef} className={classes.modal} style={{ bottom: -parentModalScrolledDistance || 0 }} >
        {children}
      </div>
    </>
  )
}

