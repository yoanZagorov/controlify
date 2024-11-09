import { useEffect, useRef } from "react";

export default function useOutsideClick(isOpen, setOpen, condition) {
  const ref = useRef(null);

  useEffect(() => {
    if (condition) {
      document.addEventListener("mousedown", handleOutsideClick);

      return () => document.removeEventListener("mousedown", handleOutsideClick);
    }
  }, [isOpen, condition]);

  const handleOutsideClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setOpen(false);
    }
  }

  return ref;
}