import { useState } from "react";

// This hooks aims to make the state variables destructuring look the same, regardless if the state was passed down or initialized locally
export default function useProvidedState(providedState, fallbackValue) {
  const [state, setState] = providedState
    ? [providedState.value, providedState.updateState]
    : useState(fallbackValue);

  return [state, setState];
}