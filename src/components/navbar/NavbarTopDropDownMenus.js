import React from 'react';
import PropTypes from 'prop-types';
import NavbarDropdown from './NavbarDropdown';
import NavbarDropdownComponents from './NavbarDropdownComponents';
import {
  authenticationRoutes,
  chatRoutes,
  componentRoutes,
  ECommerceRoutes,
  emailRoutes,
  homeRoutes,
  pageRoutes,
  pluginRoutes,
  utilityRoutes,
  widgetsRoutes,
  kanbanRoutes
} from '../../routes';
import { NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { breakpoints } from '../../helpers/utils';
import { topNavbarBreakpoint } from '../../config';

const NavbarTopDropDownMenus = ({ setNavbarCollapsed }) => {
  const components = [componentRoutes, pluginRoutes, utilityRoutes];
  const pages = [pageRoutes, kanbanRoutes, widgetsRoutes, chatRoutes, emailRoutes, ECommerceRoutes];
  const handleSetNavbarCollapsed = () => {
    const windowWidth = window.innerWidth;
    windowWidth < breakpoints[topNavbarBreakpoint] && setNavbarCollapsed(false);
  };

  return (
    <>
      <NavbarDropdown
        title={homeRoutes.name}
        items={homeRoutes.children}
        handleSetNavbarCollapsed={handleSetNavbarCollapsed}
      />
    </>
  );
};

NavbarTopDropDownMenus.propTypes = { setNavbarCollapsed: PropTypes.func.isRequired };

export default NavbarTopDropDownMenus;
