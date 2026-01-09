import { useEffect } from 'react'

// Auto focus an element
// To do: think about implementing this hook with a callback ref
export default function useAutoFocus({ ref, deps = [] }) {
  useEffect(() => {
    if (ref.current) {
      ref.current.focus({ preventScroll: true }) // Prevent the scroll to handle the UI jumping to the bottom on mobile
    }
  }, deps)
}
