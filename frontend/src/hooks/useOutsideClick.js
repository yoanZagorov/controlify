import { useEffect } from "react";

export default function useOutsideClick(ref, isOpen, close, { eventListenerCondition = true, clickCondition = true } = {}) {
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
      // Using data-sets to ensure no conflicts with other clickable elements
      const actionableElement = e.target.closest("[data-actionable='true']");
      const shouldSidebarStayOpen = e.target.closest("[data-close='false']");

      if (actionableElement && isOpen) e.target.click(); // ensures the click handler is executed

      if (!shouldSidebarStayOpen) close();
    }
  }

  function handleKeyboardOutsideClick(e) {
    if (e.key === "Escape" && clickCondition) close();
  }
}