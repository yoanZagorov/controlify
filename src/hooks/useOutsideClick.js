import { useEffect, useRef } from "react";

export default function useOutsideClick(isOpen, setOpen, condition) {
  const ref = useRef(null);

  useEffect(() => {
    if (condition) {
      document.addEventListener("mousedown", handleMouseOutsideClick);
      document.addEventListener("keydown", handleKeyboardOutsideClick);

      return () => {
        document.removeEventListener("mousedown", handleMouseOutsideClick)
        document.removeEventListener("keydown", handleKeyboardOutsideClick)
      }
    }
  }, [isOpen, condition]);

  function handleMouseOutsideClick(e) {
    if (ref.current && (!ref.current.contains(e.target))) {
      setOpen(false);
    }
  }

  function handleKeyboardOutsideClick(e) {
    if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return ref;
}