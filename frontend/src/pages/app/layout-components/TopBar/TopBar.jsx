import cn from 'classnames'
import { useLocation } from 'react-router'

import { useLayout } from '#/hooks'
import { getCurrentPage } from '#/utils/general'
import { capitalize } from '#/utils/str'

import { SvgIcon } from '#/components/SvgIcon'

// Used on mobile
export default function TopBar() {
  const { isSidebarExpanded, toggleSidebar } = useLayout()

  const location = useLocation()
  const currentPage = capitalize(getCurrentPage(location.pathname))

  const classes = {
    topBar: cn(
      'fixed w-screen h-16 px-4 tab:px-6 flex items-center gap-4 bg-navy z-10 shadow transition-[top]',
      isSidebarExpanded ? '-top-20' : 'top-0',
    ),
  }

  return (
    <div className={classes.topBar}>
      <button
        onClick={toggleSidebar}
        className="focus:outline-none focus-visible:ring-2 focus-visible:ring-goldenrod"
      >
        <SvgIcon iconName="hamburger" className="size-8 fill-gray-light" />
      </button>
      <p className="text-lg font-medium text-gray-light">{currentPage}</p>
    </div>
  )
}
