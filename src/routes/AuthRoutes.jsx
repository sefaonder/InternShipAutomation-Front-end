import { lazy } from 'react';

import Loadable from 'src/components/loader/Loadable';
import MinimalLayout from 'src/Layout/MinimalLayout';

const Login = Loadable(lazy(() => import('src/pages/Auth/Login/Login')));
const Register = Loadable(lazy(() => import('src/pages/Auth/Register/Register')));

const PasswordRefresh = Loadable(lazy(() => import('src/pages/Auth/PasswordRefresh/PasswordRefresh')));
const PasswordChange = Loadable(lazy(() => import('src/pages/Auth/PasswordChange/PasswordChange')));

const AuthRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: 'register',
      element: <Register />,
    },

    {
      path: 'login',
      element: <Login />,
    },
    {
      path: 'password-reset/:token?',
      element: <PasswordRefresh />,
    },
    {
      // Maybe this route required uniqe Role Check
      path: 'password-change',
      element: <PasswordChange />,
    },
  ],
};

export default AuthRoutes;
