import { lazy } from 'react';

// project import
import Loadable from 'src/components/loader/Loadable';
import { RequireAuth } from './RequireAuth';
import MainLayout from 'src/Layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('src/pages/Dashboard/Dashboard')));
const ProfileDefault = Loadable(lazy(() => import('src/pages/Profile/Profile')));

const InternStatusList = Loadable(lazy(() => import('src/pages/Profile/Profile')));
const InternStatusDetail = Loadable(lazy(() => import('src/pages/Profile/Profile')));
const InternStatusAdd = Loadable(lazy(() => import('src/pages/Profile/Profile')));

const InternFormList = Loadable(lazy(() => import('src/pages/Profile/Profile')));
const InternFormDetail = Loadable(lazy(() => import('src/pages/Profile/Profile')));
const InternFormAdd = Loadable(lazy(() => import('src/pages/Profile/Profile')));
const InternFormUpdate = Loadable(lazy(() => import('src/pages/Profile/Profile')));

const InterviewList = Loadable(lazy(() => import('src/pages/Profile/Profile')));
const InterviewDetail = Loadable(lazy(() => import('src/pages/Profile/Profile')));
const InterviewAdd = Loadable(lazy(() => import('src/pages/Profile/Profile')));
const InterviewUpdate = Loadable(lazy(() => import('src/pages/Profile/Profile')));

const SurveyList = Loadable(lazy(() => import('src/pages/Profile/Profile')));
const SurveyDetail = Loadable(lazy(() => import('src/pages/Profile/Profile')));
const SurveyAdd = Loadable(lazy(() => import('src/pages/Profile/Profile')));
const SurveyUpdate = Loadable(lazy(() => import('src/pages/Profile/Profile')));

const ConfidentalReportList = Loadable(lazy(() => import('src/pages/Profile/Profile')));
const ConfidentalReportDetail = Loadable(lazy(() => import('src/pages/Profile/Profile')));
const ConfidentalReportAdd = Loadable(lazy(() => import('src/pages/Profile/Profile')));
const ConfidentalReportUpdate = Loadable(lazy(() => import('src/pages/Profile/Profile')));

const UserList = Loadable(lazy(() => import('src/pages/User/User')));
const UserDetail = Loadable(lazy(() => import('src/pages/User/User')));
const UserAdd = Loadable(lazy(() => import('src/pages/User/User')));
const UserUpdate = Loadable(lazy(() => import('src/pages/User/User')));

const InterShipPanel = Loadable(lazy(() => import('src/pages/Profile/Profile')));

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
      element: <RequireAuth />,
      children: [{ path: '/', element: <ProfileDefault /> }],
    },
    // InternStatusRoutes only for Auth users
    {
      path: '/intern-status',
      element: <RequireAuth />,
      children: [
        { path: '/', element: <InternStatusList /> },
        { path: '/:internStatusId', element: <InternStatusDetail /> },
        { path: '/add', element: <InternStatusAdd /> },
      ],
    },
    // InternFormRoutes only for Auth users
    {
      path: '/intern-form',
      element: <RequireAuth />,
      children: [
        { path: '/', element: <InternFormList /> },
        { path: '/:internFormId', element: <InternFormDetail /> },
        { path: '/add', element: <InternFormAdd /> },
        { path: '/update/:internFormId', element: <InternFormUpdate /> },
      ],
    },
    // InterviewRoutes only for Auth users
    {
      path: '/interview',
      element: <RequireAuth />,
      children: [
        { path: '/', element: <InterviewList /> },
        { path: '/:interviewId', element: <InterviewDetail /> },
        { path: '/add', element: <InterviewAdd /> },
        { path: '/update/:interviewId', element: <InterviewUpdate /> },
      ],
    },
    // SurveyList Only For Admin & Comission
    {
      path: '/survey',
      element: <RequireAuth />,
      children: [
        { path: '/', element: <SurveyList /> },
        { path: '/:surveyId', element: <SurveyDetail /> },
        { path: '/add', element: <SurveyAdd /> },
        { path: '/update/:surveyId', element: <SurveyUpdate /> },
      ],
    },
    // confidential-report Only For Admin & Comission
    {
      path: '/confidential-report',
      element: <RequireAuth />,
      children: [
        { path: '/', element: <ConfidentalReportList /> },
        { path: '/::confidentialReportId', element: <ConfidentalReportDetail /> },
        { path: '/add', element: <ConfidentalReportAdd /> },
        { path: '/update/::confidentialReportId', element: <ConfidentalReportUpdate /> },
      ],
    },
    // userList Only for Admin
    {
      path: '/user',
      element: <RequireAuth />,
      children: [
        { path: '/', element: <UserList /> },
        { path: '/:userId', element: <UserDetail /> },
        { path: '/add', element: <UserAdd /> },
        { path: '/update/:userId', element: <UserUpdate /> },
      ],
    },
    {
      path: '/internship-panel',
      element: <RequireAuth />,
      children: [{ path: '/', element: <InterShipPanel /> }],
    },
  ],
  errorElement: <p>Hello something bad is happended</p>,
};

export default MainRoutes;
