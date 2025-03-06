import { useEffect } from "react";

// Used to manually scroll to top when loading the page initially 
// Since the pages are quite different, it doesn't make sense to keep the scroll position
export default function useScrollToTop(behavior = "instant") {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior });
  }, []);
}