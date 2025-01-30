import { useEffect } from "react";

export default function useFetcherReset(fetcher) {
  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      fetcher.submit({}, { action: "/data/reset-fetcher", method: "post" });
    }
  }, [fetcher])
}