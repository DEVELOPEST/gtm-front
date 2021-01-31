import React from 'react';

const Users = React.lazy(() => import('../views/users/Users'));

const adminRoutes = [
    { path: '/users', exact: true,  name: 'Users', component: Users },


];

export default adminRoutes;
