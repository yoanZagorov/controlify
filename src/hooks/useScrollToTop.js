import { useEffect } from "react";
import { useLocation } from "react-router";

export default function useScrollToTop(behavior = "instant") {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior });
  }, []);
}