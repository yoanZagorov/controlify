import { SvgIcon } from "@/components/SvgIcon";
import { mainNavPages, secNavPages } from "../../../data";
import { LogoutNavEl } from "../../../components/LogoutNavEl";
import { NavEl } from "../../../components/NavEl";

export default function CollapsedSidebar() {

  const mainNavEls = mainNavPages.map((page, index) => (
    <NavEl
      key={index}
      variant="iconOnly"
      link={{
        to: page.name,
        className: {
          base: "p-4 rounded-lg",
          active: "bg-gray-medium text-gray-dark",
        }
      }}
      icon={{
        name: page.iconName,
        className: "size-7",
      }}
    />
  ))

  const secNavEls = secNavPages.map((page, index) => (
    <NavEl
      key={index}
      variant="iconOnly"
      link={{
        to: page.name,
        className: {
          base: "p-4 rounded-lg text-gray-medium",
          active: "underline",
        }
      }}
      icon={{
        name: page.iconName,
        className: "size-5",
      }}
    />
  ))

  return (
    <div className="h-screen w-20 py-10 px-3 flex flex-col items-center bg-navy text-gray-light">
      <SvgIcon iconName="hamburger" className="size-8 fill-current" />
      <ul className="mt-14">
        {mainNavEls}
      </ul>
      <ul className="mt-auto">
        {secNavEls}
        <LogoutNavEl
          variant="iconOnly"
          className={{
            btn: "p-4",
            icon: "size-5"
          }}
        />
      </ul>
    </div>
  )
}
