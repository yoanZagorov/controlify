import { useEffect } from "react";

export default function useAutoFocus({ ref, selectOnFocus = false, deps = [] }) {
  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
      if (selectOnFocus) {
        ref.current.select();
      };
    }
  }, deps)

  return ref;
}