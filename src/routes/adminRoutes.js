import React from 'react';

const Users = React.lazy(() => import('../views/users/Users'));
const User = React.lazy(() => import('../views/users/User'));

const adminRoutes = [
    { path: '/users', exact: true,  name: 'Users', component: Users },
    { path: '/users/:id', exact: true,  name: 'Users', component: User },
];

export default adminRoutes;
