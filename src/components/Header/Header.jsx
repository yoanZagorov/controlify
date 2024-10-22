import MobileHeader from "./components/MobileHeader";
import DesktopHeader from "./components/DesktopHeader";

export default function Header() {
  // To do: Implement a real hook to get the current view
  const isMobile = true;

  return (
    <header>
      {isMobile ?
        <MobileHeader />
        :
        <DesktopHeader />
      }
    </header>
  )
}