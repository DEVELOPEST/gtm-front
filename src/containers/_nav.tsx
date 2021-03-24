import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavDivider',
    className: 'm-2'
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Leaderboard',
    to: '/leaderboard',
    icon: <CIcon name="cil-chart" customClasses="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Repositories',
    to: '/repositories',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
  }
]

export default _nav
