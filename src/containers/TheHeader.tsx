import React from "react";
import {useStoreActions, useStoreState} from "../store/store";

import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CBreadcrumbRouter,
} from '@coreui/react'

// routes config
import routes from '../routes/routes'
import TheHeaderSettingsDropdown from "./TheHeaderSettingsDropdown";

const TheHeader = () => {
  const {sidebarShow} = useStoreState(state => state.sidebar)
  const {setSidebarShow} = useStoreActions(actions => actions.sidebar)

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    setSidebarShow(val);
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    setSidebarShow(val);
  }

  return (
    <CHeader withSubheader data-testid="the-header">
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderBrand className="mx-auto d-lg-none" to="/" />

      <CHeaderNav className="d-md-down-none mr-auto">
        <CHeaderNavItem className="px-3" >
          <CHeaderNavLink to="/dashboard" data-testid="dashboard-link">Dashboard</CHeaderNavLink>
        </CHeaderNavItem>

      </CHeaderNav>

      <CHeaderNav className="px-3">
          <TheHeaderSettingsDropdown/>
      </CHeaderNav>

      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter
          className="border-0 c-subheader-nav m-0 px-0 px-md-3"
          routes={routes}
        />
          <div className="d-md-down-none mfe-2 c-subheader-nav">

          </div>
      </CSubheader>
    </CHeader>
  )
}

export default TheHeader;
