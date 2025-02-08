import { useEffect } from "react";

export default function useKeyboardFocus() {
  useEffect(() => {
    function handleKeydown(e) {
      if (e.key === "Tab") {
        document.body.classList.add("using-keyboard");
      }
    }

    function handleMousedown(e) {
      document.body.classList.remove("using-keyboard");
    }

    document.addEventListener("keydown", handleKeydown)
    document.addEventListener("mousedown", handleMousedown)

    return () => {
      document.removeEventListener("keydown", handleKeydown)
      document.removeEventListener("mousedown", handleMousedown)
    }
  }, [])
}