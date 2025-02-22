import { useEffect, useState } from "react"

export default function useViewportHeight() {
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  useEffect(() => {
    document.addEventListener("resize", () => setViewportHeight(window.innerHeight));

    return () => document.removeEventListener("resize", () => setViewportHeight(window.innerHeight));
  }, []);

  return viewportHeight;
}