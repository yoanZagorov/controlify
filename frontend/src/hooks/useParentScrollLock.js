import { useEffect } from "react";

export default function useParentScrollLock(parentModalRef, isModalOpen) {
  useEffect(() => {
    const initialParentModalOverflow = parentModalRef?.current.style.overflow;
    if (parentModalRef?.current && isModalOpen) parentModalRef.current.style.overflow = "hidden";

    return () => {
      if (parentModalRef?.current) {
        parentModalRef.current.style.overflow = initialParentModalOverflow;
      }
    }
  }, [isModalOpen]);
}