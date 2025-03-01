import { useEffect } from "react";

// Lock the scroll of the body. Used primarily for modals
export default function useBodyScrollLock(isModalOpen) {
  useEffect(() => {
    if (isModalOpen) {
      const initialBodyOverflow = window.getComputedStyle(document.body).overflow;

      document.body.style.overflow = "hidden";

      return () => { document.body.style.overflow = initialBodyOverflow; }
    }
  }, [isModalOpen]);
}
