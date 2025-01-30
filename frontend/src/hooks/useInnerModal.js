import { useState } from "react";
import useMountTransition from "./useMountTransition";
import useScrollLock from "./useScrollLock";

export default function useInnerModal(unmountDelay) {
  const [isModalOpen, setModalOpen] = useState(false);
  const hasTransitioned = useMountTransition(isModalOpen, unmountDelay)
  // useScrollLock(isModalOpen); To do: find out how to stop this from interfering with the outer modal scrolllock

  return [isModalOpen, setModalOpen, hasTransitioned];
}