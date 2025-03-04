import { useState } from "react";

// Used in components that can both receive state as a prop or initialize it themselves
// Aims to make the state variables destructuring look the same, regardless if the state was passed down or initialized locally
export default function useProvidedState(providedState, fallbackValue) {
  const [state, setState] = providedState
    ? [providedState.value, providedState.updateState]
    : useState(fallbackValue);

  return [state, setState];
}