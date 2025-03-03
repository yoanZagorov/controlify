import { useEffect } from "react";

// Lock the scroll of the parent modal. Used for nested modals
export default function useParentScrollLock(parentModalRef, isModalOpen) {
  useEffect(() => {
    if (parentModalRef?.current && isModalOpen) {
      const initialParentModalOverflow = window.getComputedStyle(parentModalRef.current).overflow;

      parentModalRef.current.style.overflow = "hidden";

      return () => {
        if (parentModalRef.current) {
          parentModalRef.current.style.overflow = initialParentModalOverflow;
        }
      }
    }
  }, [isModalOpen]);
}