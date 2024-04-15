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

const InternFormList = Loadable(lazy(() => import('src/pages/InternForm/InternFormList')));
const InternFormDetail = Loadable(lazy(() => import('src/pages/InternForm/InternFormDetail/InternFormDetail')));
const InternFormAdd = Loadable(lazy(() => import('src/pages/InternForm/AddInternForm/InternFormAdd')));
const InternFormUpdate = Loadable(lazy(() => import('src/pages/InternForm/InternFormList')));

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
      children: [{ path: '/profile', element: <ProfileDefault /> }],
    },
    // InternStatusRoutes only for Auth users
    {
      path: '/intern-status',
      element: <RequireAuth />,
      children: [
        { path: '/intern-status/', element: <InternStatusList /> },
        { path: '/intern-status/:internStatusId', element: <InternStatusDetail /> },
        { path: '/intern-status/add', element: <InternStatusAdd /> },
      ],
    },
    // InternFormRoutes only for Auth users
    {
      path: '/intern-form',
      element: <RequireAuth />,
      children: [
        { path: '/intern-form/', element: <InternFormList /> },
        { path: '/intern-form/:internFormId', element: <InternFormDetail /> },
        { path: '/intern-form/add', element: <InternFormAdd /> },
        { path: '/intern-form/update/:internFormId', element: <InternFormUpdate /> },
      ],
    },
    // InterviewRoutes only for Auth users
    {
      path: '/interview',
      element: <RequireAuth />,
      children: [
        { path: '/interview/', element: <InterviewList /> },
        { path: '/interview/:interviewId', element: <InterviewDetail /> },
        { path: '/interview/add', element: <InterviewAdd /> },
        { path: '/interview/update/:interviewId', element: <InterviewUpdate /> },
      ],
    },
    // SurveyList Only For Admin & Comission
    {
      path: '/survey',
      element: <RequireAuth />,
      children: [
        { path: '/survey/', element: <SurveyList /> },
        { path: '/survey/:surveyId', element: <SurveyDetail /> },
        { path: '/survey/add', element: <SurveyAdd /> },
        { path: '/survey/update/:surveyId', element: <SurveyUpdate /> },
      ],
    },
    // confidential-report Only For Admin & Comission
    {
      path: '/confidential-report',
      element: <RequireAuth />,
      children: [
        { path: '/confidential-report/', element: <ConfidentalReportList /> },
        { path: '/confidential-report/:confidentialReportId', element: <ConfidentalReportDetail /> },
        { path: '/confidential-report/add', element: <ConfidentalReportAdd /> },
        { path: '/confidential-report/update/:confidentialReportId', element: <ConfidentalReportUpdate /> },
      ],
    },
    {
      path: '/user',
      element: <RequireAuth />,
      children: [
        { path: '/user/', element: <UserList /> },
        { path: '/user/:userId', element: <UserDetail /> },
        { path: '/user/add', element: <UserAdd /> },
        { path: '/user/update/:userId', element: <UserUpdate /> },
      ],
    },
    {
      path: '/internship-panel',
      element: <RequireAuth />,
      children: [{ path: '/internship-panel/', element: <InterShipPanel /> }],
    },
  ],
  // errorElement: <p>Hello something bad is happended</p>,
};

export default MainRoutes;
