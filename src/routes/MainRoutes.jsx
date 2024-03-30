import { lazy } from 'react';

// project import
import Loadable from 'src/components/loader/Loadable';
import { RequireAuth } from './RequireAuth';
import MainLayout from 'src/Layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('src/pages/Dashboard/Dashboard')));
const ProfileDefault = Loadable(lazy(() => import('src/pages/Profile/Profile')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <RequireAuth />,
      children: [{ path: '/', element: <DashboardDefault /> }],
    },
    {
      path: '/profile',
      element: <ProfileDefault />,
    },
    {
      // InternStatusRoutes only for Auth users
      path: '/intern-status',
      element: <ProfileDefault />,
    },
    {
      path: '/intern-status/:internStatusId',
      element: <ProfileDefault />,
    },
    // InternFormRoutes only for Auth users
    {
      path: '/intern-form',
      element: <ProfileDefault />,
    },
    {
      path: '/intern-form/:internFormId',
      element: <ProfileDefault />,
    },
    // InterviewRoutes only for Auth users
    {
      path: '/interview',
      element: <ProfileDefault />,
    },
    {
      path: '/interview/:interviewId',
      element: <ProfileDefault />,
    },
    // SurveyList Only For Admin & Comission
    {
      path: '/survey',
      element: <ProfileDefault />,
    },
    {
      path: '/survey/:surveyId',
      element: <ProfileDefault />,
    },
    // confidential-report Only For Admin & Comission
    {
      path: '/confidential-report',
      element: <ProfileDefault />,
    },
    {
      path: '/confidential-report/:confidentialReportId',
      element: <ProfileDefault />,
    },
    // userList Only for Admin
    {
      path: '/user',
      element: <ProfileDefault />,
    },
    {
      path: '/user/:userId',
      element: <ProfileDefault />,
    },
  ],
  errorElement: <p>Hello something bad is happended</p>,
};

export default MainRoutes;
