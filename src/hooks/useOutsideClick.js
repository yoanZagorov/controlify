import { useEffect, useRef } from "react";

export default function useOutsideClick(isOpen, setOpen) {
  const ref = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  const handleOutsideClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setOpen(false);
    }
  }

  return ref;
}