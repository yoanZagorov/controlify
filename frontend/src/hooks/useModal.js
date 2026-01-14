import { useEffect, useRef, useState } from 'react'

import { resetFetcher } from '#/services/router/utils'
import { isObjTruthy } from '#/utils/obj'

import useMountTransition from './useMountTransition'
import useOutsideClick from './useOutsideClick'
import useBodyScrollLock from './useBodyScrollLock'
import useParentScrollLock from './useParentScrollLock'

// Single hook combining all modal related functionality
// Modal data reset is currently not implemented but could be done through the resetModalData param
export default function useModal({
  type = 'fullScreen',
  fetcher = {},
  parentModalRef = null,
  unmountDelay = 300,
  resetModalData,
} = {}) {
  const isFullScreen = type === 'fullScreen'

  const [isModalOpen, setModalOpen] = useState(false)
  const modalRef = useRef(null)

  const hasTransitioned = useMountTransition(isModalOpen, unmountDelay) // Used for smooth animations
  useOutsideClick(modalRef, isModalOpen, () => setModalOpen(false)) // Used to close the modal on outside click
  isFullScreen
    ? useBodyScrollLock(isModalOpen)
    : useParentScrollLock(parentModalRef, isModalOpen) // Lock the right element's scroll

  const isFetcher = isObjTruthy(fetcher)
  isFetcher &&
    useEffect(() => {
      if (fetcher.state === 'idle' && fetcher.data) {
        setModalOpen(false)
        window.scrollTo({ top: 0, behavior: 'smooth' })
        resetFetcher(fetcher)
      }
    }, [fetcher.data, fetcher.state])

  return { modalState: [isModalOpen, setModalOpen], hasTransitioned, modalRef }
}
