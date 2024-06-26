import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import HomePage from 'views/home/HomePage';
import GuestRoute from 'guards/GuestRoute';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: (
    <GuestRoute>
      <MinimalLayout />
    </GuestRoute>
  ),
  children: [
    {
      path: '/',
      element: <AuthLogin3 />
    },
    {
      path: '/login',
      element: <AuthLogin3 />
    }
  ]
};

export default AuthenticationRoutes;
