import React from 'react';
import {ADMIN, USER} from "../constants";

const Dashboard = React.lazy(() => import('../views/dashboard/Dashboard'));
const Leaderboard = React.lazy(() => import('../views/leaderboard/Leaderboard'));
const ChangePassword = React.lazy(() => import('../views/profile/ChangePassword'));
const Profile = React.lazy(() => import('../views/profile/Profile'));
const Users = React.lazy(() => import('../views/users/Users'));
const User = React.lazy(() => import('../views/users/User'));
const Repositories = React.lazy(() => import('../views/repositories/Repositories'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, authority: USER },
  { path: '/leaderboard', name: 'Leaderboard', component: Leaderboard, authority: USER },
  { path: '/profile/password', name: 'Change password', component: ChangePassword, authority: USER },
  { path: '/profile', name: 'Profile', component: Profile, authority: USER },
  { path: '/repositories', name: 'Repositories', component: Repositories, authority: USER },
  { path: '/users/:id', name: 'User', component: User, authority: ADMIN },
  { path: '/users', name: 'Users', component: Users, authority: ADMIN },
];

export default routes;
