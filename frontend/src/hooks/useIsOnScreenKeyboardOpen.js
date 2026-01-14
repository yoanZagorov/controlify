import { useEffect, useState } from 'react'

// Avoid function redefinitions
function isInput(element) {
  return element.tagName === 'INPUT'
}

// Check if the Virtual Keyboard is open (mobile)
// Currently not used but very high chance to do so
export default function useIsOnScreenKeyboardOpen() {
  const [isOpen, setOpen] = useState(false)

  useEffect(() => {
    function handleFocusIn(e) {
      if (!e.target) return
      if (isInput(e.target)) setOpen(true)
    }

    function handleFocusOut(e) {
      if (!e.target) return
      if (isInput(e.target)) setOpen(false)
    }

    document.addEventListener('focusin', handleFocusIn)
    document.addEventListener('focusout', handleFocusOut)

    return () => {
      document.removeEventListener('focusin', handleFocusIn)
      document.removeEventListener('focusout', handleFocusOut)
    }
  }, [])

  return isOpen
}
