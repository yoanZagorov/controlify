import { useState } from "react";
import useMountTransition from "./useMountTransition";

export default function useInnerModal(unmountDelay) {
  const [isModalOpen, setModalOpen] = useState(false);
  const hasTransitioned = useMountTransition(isModalOpen, unmountDelay)

  return [isModalOpen, setModalOpen, hasTransitioned];
}