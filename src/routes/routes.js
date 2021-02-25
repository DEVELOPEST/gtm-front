import React from 'react';

const Dashboard = React.lazy(() => import('../views/dashboard/Dashboard'));
const Leaderboard = React.lazy(() => import('../views/leaderboard/Leaderboard'));
const ChangePassword = React.lazy(() => import('../views/profile/ChangePassword'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/leaderboard', name: 'Leaderboard', component: Leaderboard },
  { path: '/profile/password', name: 'Change password', component: ChangePassword },

];

export default routes;