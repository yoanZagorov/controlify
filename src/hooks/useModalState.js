import { useState } from "react";

export default function useModalState(providedState, fallbackValue) {
  const [state, setState] = providedState
    ? [providedState.value, providedState.updateState]
    : useState(fallbackValue);

  return [state, setState];
}