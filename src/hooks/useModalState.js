import { useState } from "react";

export default function useModalState(fallbackValue, providedState) {
  const [state, setState] = providedState
    ? [providedState.value, providedState.updateState]
    : useState(fallbackValue);

  return [state, setState];
}