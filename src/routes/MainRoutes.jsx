import { lazy } from 'react';

// project import
import Loadable from 'src/components/loader/Loadable';
import MainLayout from 'src/Layout/MainLayout/index';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('src/pages/Dashboard/Dashboard')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />,
    },
  ],
};

export default MainRoutes;
