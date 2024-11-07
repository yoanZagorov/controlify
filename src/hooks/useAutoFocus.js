import { useRef, useEffect } from "react";

export default function useAutoFocus(deps = []) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, deps)

  return ref;
}