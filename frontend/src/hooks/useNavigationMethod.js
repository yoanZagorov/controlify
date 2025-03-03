import { useEffect } from "react";

// Used to have access to the user's navigation across the app
// A NavigationMethodContext would make more sense than using the body's classname but the current approach works well as well
export default function useNavigationMethod() {
  useEffect(() => {
    function handleKeydown(e) {
      if (e.key === "Tab") {
        document.body.classList.add("using-keyboard");
      }
    }

    function handleMousedown(e) {
      document.body.classList.remove("using-keyboard");
    }

    document.addEventListener("keydown", handleKeydown);
    document.addEventListener("mousedown", handleMousedown);

    return () => {
      document.removeEventListener("keydown", handleKeydown)
      document.removeEventListener("mousedown", handleMousedown)
    }
  }, [])
}