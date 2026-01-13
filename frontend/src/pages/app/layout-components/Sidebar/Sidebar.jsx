import cn from 'classnames'
import { useRouteLoaderData } from 'react-router'

import { COLORS, PAGES, ROUTES } from '#/constants'
import { useBreakpoint, useLayout } from '#/hooks'
import { FullLogo } from '#/assets/logos/FullLogo'
import { SvgIcon } from '#/components/SvgIcon'

import { NavItem } from '../NavItem'

// The primary sidebar
export default function Sidebar() {
  const {
    userData: { profilePic, email, fullName },
  } = useRouteLoaderData('app')
  const { isSidebarExpanded, toggleSidebar, sidebarRef } = useLayout()
  const { isDesktop } = useBreakpoint()

  function renderNavItems(navPages, layout, type, handleClose) {
    return navPages.map((page, index) => (
      <NavItem
        key={index}
        variants={{ layout, type }}
        to={page.name}
        iconName={page.iconName}
        handleClose={handleClose}
      />
    ))
  }

  const primaryNavItems = renderNavItems(
    PAGES.PRIMARY,
    'iconWithText',
    'primary',
    !isDesktop ? toggleSidebar : null,
  )
  const secondaryNavItems = renderNavItems(
    PAGES.SECONDARY,
    'iconWithText',
    'secondary',
    !isDesktop ? toggleSidebar : null,
  )

  const classes = {
    sidebar: cn(
      'fixed inset-y-0 left-0 h-screen w-64 ml:w-72 tab:w-80 ll:w-96 pt-8 pb-4 tab:pt-10 ll:pt-12 flex flex-col items-center text-gray-light bg-navy overflow-y-auto z-10 transition-transform tab:duration-500',
      !isSidebarExpanded && '-translate-x-full',
    ),
  }

  return (
    <div className={classes.sidebar} ref={sidebarRef}>
      <div className="flex w-full flex-col items-center px-4 text-center">
        <FullLogo color={COLORS.THEME.GRAY.LIGHT} />
        <p className="text-sm font-light tracking-wider ml:text-base ll:text-lg">
          Take control of your finances
        </p>

        <div className="mt-8 size-20 rounded-full tab:size-24 lm:size-28 ll:mt-10 ll:size-32">
          {profilePic?.url ? (
            <img
              src={profilePic.url}
              className="size-full rounded-full"
              alt="Avatar"
            />
          ) : (
            <SvgIcon
              iconName="user-circle"
              className="size-full fill-current"
            />
          )}
        </div>

        <p className="mt-4 text-xs font-light ll:text-sm">{email}</p>
        <p className="mt-2 text-2xl">{fullName}</p>
      </div>

      <nav className="mt-8 w-full">
        <ul>{primaryNavItems}</ul>
      </nav>

      <nav className="mt-auto w-full">
        <ul className="mt-12">
          {' '}
          {/* Ensures primary and secondary nav bars are never squished together */}
          {secondaryNavItems}
          <NavItem
            variants={{
              layout: 'iconWithText',
              type: 'secondary',
              purpose: 'logout',
            }}
            action={ROUTES.APP}
            handleClose={!isDesktop ? toggleSidebar : null}
          />
        </ul>
      </nav>
    </div>
  )
}
