import { lazy } from 'react';

import Loadable from 'src/components/loader/Loadable';
import MinimalLayout from 'src/Layout/MinimalLayout';

const Login = Loadable(lazy(() => import('src/pages/Auth/Login/Login')));
const Register = Loadable(lazy(() => import('src/pages/Auth/Register/Register')));
const PasswordRefresh = Loadable(lazy(() => import('src/pages/Auth/PasswordRefresh/PasswordRefresh')));

const AuthRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: 'register',
      element: <Register />,
    },
    {
      path: 'password-refresh',
      element: <PasswordRefresh />,
    },
  ],
};

export default AuthRoutes;
