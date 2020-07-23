import React from 'react';
import PropTypes from 'prop-types';
import NavbarDropdown from './NavbarDropdown';
import NavbarDropdownComponents from './NavbarDropdownComponents';
import {
  // authenticationRoutes,
  // chatRoutes,
  // componentRoutes,
  // ECommerceRoutes,
  // emailRoutes,
  // homeRoutes,
  // pageRoutes,
  // pluginRoutes,
  // utilityRoutes,
  // widgetsRoutes,
  // kanbanRoutes,
  dashboardRoutes,
  spaceRoutes,
  equipmentRoutes,
  tenantRoutes,
  storeRoutes,
  shopfloorRoutes,
  auxiliarySystemRoutes,
  fddRoutes,
  monitoringRoutes,
  advancedReportingRoutes,
  knowledgeBaseRoutes
} from '../../routes';
import { NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { breakpoints } from '../../helpers/utils';
import { topNavbarBreakpoint } from '../../config';

const NavbarTopDropDownMenus = ({ setNavbarCollapsed }) => {
  // const components = [componentRoutes, pluginRoutes, utilityRoutes];
  // const pages = [pageRoutes, kanbanRoutes, widgetsRoutes, chatRoutes, emailRoutes, ECommerceRoutes];
  const handleSetNavbarCollapsed = () => {
    const windowWidth = window.innerWidth;
    windowWidth < breakpoints[topNavbarBreakpoint] && setNavbarCollapsed(false);
  };

  return (
    <>
      {/*<NavbarDropdown
        title={homeRoutes.name}
        items={homeRoutes.children}
        handleSetNavbarCollapsed={handleSetNavbarCollapsed}
      />
       <NavbarDropdown title={pageRoutes.name} items={pages} handleSetNavbarCollapsed={handleSetNavbarCollapsed} />
      <NavbarDropdownComponents
        title={componentRoutes.name}
        items={components}
        handleSetNavbarCollapsed={handleSetNavbarCollapsed}
      />
      <NavbarDropdown
        title={authenticationRoutes.name}
        items={authenticationRoutes.children}
        handleSetNavbarCollapsed={handleSetNavbarCollapsed}
      />

      <NavItem onClick={handleSetNavbarCollapsed}>
        <NavLink className="nav-link" to="/documentation">
          Documentation
        </NavLink>
      </NavItem> */}
      <NavItem onClick={handleSetNavbarCollapsed}>
        <NavLink className="nav-link" to={dashboardRoutes.to}>
          {dashboardRoutes.name}
        </NavLink>
      </NavItem>
      <NavbarDropdownComponents
        title={spaceRoutes.name}
        items={[spaceRoutes]}
        handleSetNavbarCollapsed={handleSetNavbarCollapsed}
      />
      <NavbarDropdownComponents
        title={equipmentRoutes.name}
        items={[equipmentRoutes]}
        handleSetNavbarCollapsed={handleSetNavbarCollapsed}
      />
      <NavbarDropdownComponents
        title={tenantRoutes.name}
        items={[tenantRoutes]}
        handleSetNavbarCollapsed={handleSetNavbarCollapsed}
      />
      <NavbarDropdownComponents
        title={storeRoutes.name}
        items={[storeRoutes]}
        handleSetNavbarCollapsed={handleSetNavbarCollapsed}
      />
      <NavbarDropdownComponents
        title={shopfloorRoutes.name}
        items={[shopfloorRoutes]}
        handleSetNavbarCollapsed={handleSetNavbarCollapsed}
      />
      <NavbarDropdownComponents
        title={auxiliarySystemRoutes.name}
        items={[auxiliarySystemRoutes]}
        handleSetNavbarCollapsed={handleSetNavbarCollapsed}
      />
      <NavbarDropdownComponents
        title={fddRoutes.name}
        items={[fddRoutes]}
        handleSetNavbarCollapsed={handleSetNavbarCollapsed}
      />
      <NavbarDropdownComponents
        title={monitoringRoutes.name}
        items={[monitoringRoutes]}
        handleSetNavbarCollapsed={handleSetNavbarCollapsed}
      />
      <NavItem onClick={handleSetNavbarCollapsed}>
        <NavLink className="nav-link" to={advancedReportingRoutes.to}>
          {advancedReportingRoutes.name}
        </NavLink>
      </NavItem>
      <NavItem onClick={handleSetNavbarCollapsed}>
        <NavLink className="nav-link" to={knowledgeBaseRoutes.to}>
          {knowledgeBaseRoutes.name}
        </NavLink>
      </NavItem>
    </>
  );
};

NavbarTopDropDownMenus.propTypes = { setNavbarCollapsed: PropTypes.func.isRequired };

export default NavbarTopDropDownMenus;
