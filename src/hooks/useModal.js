import { useEffect, useState } from "react";
import useScrollLock from "./useScrollLock";
import useMountTransition from "./useMountTransition";
import { resetFetcher } from "@/services/router/utils";

export default function useModal(fetcher, unmountDelay = 300) {
  console.log("Modal hook");
  const [isModalOpen, setModalOpen] = useState(false);
  const hasTransitioned = useMountTransition(isModalOpen, unmountDelay);
  useScrollLock(isModalOpen);

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      setModalOpen(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
      resetFetcher(fetcher);
    }
  }, [fetcher.data, fetcher.state])

  return [isModalOpen, setModalOpen, hasTransitioned];
}