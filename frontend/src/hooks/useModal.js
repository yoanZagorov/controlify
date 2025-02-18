import { useEffect, useState } from "react";

import { resetFetcher } from "@/services/router/utils";

import useScrollLock from "./useScrollLock";
import useMountTransition from "./useMountTransition";
import useOutsideClick from "./useOutsideClick";
import { isObjTruthy } from "@/utils/obj";

// Single hook combining all modal related functionality
export default function useModal({ isBlocking = true, fetcher = {}, resetModalData, unmountDelay = 300 }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const hasTransitioned = useMountTransition(isModalOpen, unmountDelay);

  const modalRef = useOutsideClick(isModalOpen, () => setModalOpen(false));

  isBlocking && useScrollLock(isModalOpen);

  const isFetcher = isObjTruthy(fetcher);
  isFetcher && useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      setModalOpen(false);
      resetFetcher(fetcher);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

  }, [fetcher.data, fetcher.state]);
  return { modalState: [isModalOpen, setModalOpen], hasTransitioned, modalRef };
}