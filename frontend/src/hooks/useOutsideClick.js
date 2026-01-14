import { useEffect } from 'react'

// Used to close an element when clicked anywhere else
// Used for the sidebar and modals
export default function useOutsideClick(
  ref,
  isOpen,
  close,
  { eventListenerCondition = true, clickCondition = true } = {},
) {
  useEffect(() => {
    function handleMouseOutsideClick(e) {
      if (ref.current && !ref.current.contains(e.target) && clickCondition) {
        // Used for actionable elements that have a click handler
        const actionableElement = e.target.closest("[data-actionable='true']")

        if (actionableElement && isOpen) actionableElement.click() // ensures the click handler is executed

        close()
      }
    }

    function handleKeyboardOutsideClick(e) {
      if (e.key === 'Escape' && clickCondition) close()
    }

    if (eventListenerCondition) {
      document.addEventListener('mousedown', handleMouseOutsideClick)
      document.addEventListener('keydown', handleKeyboardOutsideClick)

      return () => {
        document.removeEventListener('mousedown', handleMouseOutsideClick)
        document.removeEventListener('keydown', handleKeyboardOutsideClick)
      }
    }
  }, [isOpen, eventListenerCondition])
}
