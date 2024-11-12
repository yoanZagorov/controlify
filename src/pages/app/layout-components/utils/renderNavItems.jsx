import { NavItem } from "../NavItem";

const renderNavItems = (navPages, layout, type, handleClose) =>
  navPages.map((page, index) => (
    <NavItem
      key={index}
      variants={{ layout, type }}
      to={page.name}
      iconName={page.iconName}
      handleClose={handleClose}
    />
  ));

export default renderNavItems;