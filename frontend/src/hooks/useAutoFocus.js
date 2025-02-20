import { useEffect } from "react";

export default function useAutoFocus({ ref, selectOnFocus = false, deps = [] }) {
  useEffect(() => {
    if (ref?.current) {
      ref.current.focus({ preventScroll: true }); // Prevent the scroll to handle the UI jumping to the bottom on mobile
      if (selectOnFocus) {
        ref.current.select();
      };
    }
  }, deps)
}