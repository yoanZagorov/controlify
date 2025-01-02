import { useEffect, useState } from "react";

import { resetFetcher } from "@/services/router/utils";

import useScrollLock from "./useScrollLock";
import useMountTransition from "./useMountTransition";
import useOutsideClick from "./useOutsideClick";

export default function useModal({ isBlocking = true, fetcher = {}, unmountDelay = 300 }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const hasTransitioned = useMountTransition(isModalOpen, unmountDelay);

  const modalRef = useOutsideClick(isModalOpen, () => setModalOpen(false));

  isBlocking && useScrollLock(isModalOpen);

  const isFetcher = Object.keys(fetcher).length !== 0;
  isFetcher && useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      setModalOpen(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
      resetFetcher(fetcher);
    }
  }, [fetcher.data, fetcher.state])

  return { modalState: [isModalOpen, setModalOpen], hasTransitioned, modalRef };
}