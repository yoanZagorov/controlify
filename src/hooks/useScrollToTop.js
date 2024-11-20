import { useEffect } from "react";

export default function useScrollToTop(behavior = "instant") {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior });
  }, []);
}