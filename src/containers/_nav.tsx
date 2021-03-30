import React from 'react'
import CIcon from '@coreui/icons-react'
import {cilDiamond} from '@coreui/icons'

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
    icon:'cil-diamond',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Repositories',
    to: '/repositories',
    icon: 'cil-folder-open',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Timeline Comparison',
    to: '/timeline-comparison',
    icon: 'cil-folder-open',
  }
]

export default _nav
