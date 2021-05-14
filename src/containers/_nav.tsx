import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
    "data-testid": "dashboard"
  },
  {
    _tag: 'CSidebarNavDivider',
    className: 'm-2'
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Leaderboard',
    to: '/leaderboard',
    icon:'cil-diamond',
    "data-testid": "leaderboard"
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Comparison',
    to: '/comparison',
    icon: 'cil-folder-open',
    "data-testid": "comparison"
  }
]

export default _nav
