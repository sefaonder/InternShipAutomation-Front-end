import { lazy } from 'react';

import Loadable from 'src/components/loader/Loadable';
import MinimalLayout from 'src/Layout/MinimalLayout';

const Login = Loadable(lazy(() => import('src/pages/Auth/Login/Login')));
const Register = Loadable(lazy(() => import('src/pages/Auth/Register/Register')));

const PasswordRefresh = Loadable(lazy(() => import('src/pages/Auth/PasswordRefresh/PasswordRefresh')));
const PasswordChange = Loadable(lazy(() => import('src/pages/Auth/PasswordChange/PasswordChange')));

const CompanyConfidentalReport = Loadable(
  lazy(() => import('src/pages/ConfidentalReport/CompanyConfidentalReport/CompanyConfidentalReport')),
);

const NotValidToken = Loadable(lazy(() => import('src/pages/Error/NotValidToken')));
const ErrorPage = Loadable(lazy(() => import('src/pages/Error/ErrorPage')));

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
      path: 'password-change',
      element: <PasswordChange />,
    },
    {
      path: 'company/confidential-report/:token?',
      element: <CompanyConfidentalReport />,
    },
    {
      path: 'notvalid',
      element: <NotValidToken />,
    },
    {
      path: '/*',
      element: <ErrorPage />,
    },
  ],
};

export default AuthRoutes;
