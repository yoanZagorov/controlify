import { useEffect, useRef } from "react";

export default function useOutsideClick(isOpen, close, { eventListenerCondition = true, clickCondition = true } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    if (eventListenerCondition) {
      document.addEventListener("mousedown", handleMouseOutsideClick);
      document.addEventListener("keydown", handleKeyboardOutsideClick);

      return () => {
        document.removeEventListener("mousedown", handleMouseOutsideClick);
        document.removeEventListener("keydown", handleKeyboardOutsideClick);
      }
    }
  }, [isOpen, eventListenerCondition]);

  function handleMouseOutsideClick(e) {
    if (ref.current && (!ref.current.contains(e.target)) && clickCondition) {
      const actionableElement = e.target.closest("[data-actionable='true']");
      const shouldSidebarStayOpen = e.target.closest("[data-close='false']");

      if (actionableElement && isOpen) e.target.click(); // ensures the click handler is executed

      if (!shouldSidebarStayOpen) close();
    }
  }

  function handleKeyboardOutsideClick(e) {
    if (e.key === "Escape" && clickCondition) {
      close();
    }
  }


  return ref;
}