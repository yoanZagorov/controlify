import { useEffect } from 'react'

// Select an input element
export default function useSelectInput(inputRef) {
  useEffect(() => {
    function selectInput() {
      inputRef.current.select()
    }

    if (inputRef.current) {
      inputRef.current.addEventListener('focus', selectInput)
    }

    return () => {
      if (inputRef.current) {
        inputRef.current.removeEventListener('focus', selectInput)
      }
    }
  }, [])
}
