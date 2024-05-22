import { lazy } from 'react';

// project import
import Loadable from 'src/components/loader/Loadable';
import { RequireAuth } from './RequireAuth';
import MainLayout from 'src/Layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('src/pages/Dashboard/Dashboard')));
const ProfileDefault = Loadable(lazy(() => import('src/pages/Profile/Profile')));

const InternStatusList = Loadable(lazy(() => import('src/pages/InternStatus/InternStatusList')));
const InternStatusDetail = Loadable(lazy(() => import('src/pages/InternStatus/InternStatusDetail/InternStatusDetail')));
const InternStatusUpdate = Loadable(lazy(() => import('src/pages/InternStatus/AddInternStatus')));

const InternFormList = Loadable(lazy(() => import('src/pages/InternForm/InternFormList')));
const InternFormDetail = Loadable(lazy(() => import('src/pages/InternForm/InternFormDetail/InternFormDetail')));
const InternFormAdd = Loadable(lazy(() => import('src/pages/InternForm/AddInternForm/InternFormAdd')));
const InternFormUpdate = Loadable(lazy(() => import('src/pages/InternForm/AddInternForm/InternFormUpdate')));

const InterviewList = Loadable(lazy(() => import('src/pages/Interview/InterviewList')));
const InterviewDetail = Loadable(lazy(() => import('src/pages/Interview/InterviewDetail/InterviewDetail')));
const InterviewAdd = Loadable(lazy(() => import('src/pages/Interview/InterviewAdd/InterviewAdd')));
const InterviewUpdate = Loadable(lazy(() => import('src/pages/Interview/InterviewAdd/InterviewUpdate')));

const SurveyDetail = Loadable(lazy(() => import('src/pages/Survey/SurveyDetail/SurveyDetail')));
const SurveyAdd = Loadable(lazy(() => import('src/pages/Survey/SurveyAdd')));
const SurveyList = Loadable(lazy(() => import('src/pages/Survey/SurveyList')));
const SurveyUpdate = Loadable(lazy(() => import('src/pages/Survey/SurveyUpdate')));

const ConfidentalReportList = Loadable(lazy(() => import('src/pages/ConfidentalReport/ConfidentalReportList')));
const ConfidentalReportDetail = Loadable(
  lazy(() => import('src/pages/ConfidentalReport/ConfidentalReportDetail/ConfidentalReportDetail')),
);
const ConfidentalReportAdd = Loadable(lazy(() => import('src/pages/ConfidentalReport/ConfidentalReportAdd')));
const ConfidentalReportUpdate = Loadable(lazy(() => import('src/pages/ConfidentalReport/ConfidentalReportUpdate')));

const UserList = Loadable(lazy(() => import('src/pages/User/UserList')));
const UserDetail = Loadable(lazy(() => import('src/pages/User/UserDetail')));
const UserAdd = Loadable(lazy(() => import('src/pages/User/UserAdd')));
const UserUpdate = Loadable(lazy(() => import('src/pages/User/UserAdd')));

const InterShipPanel = Loadable(lazy(() => import('src/pages/InternshipPanel/InternShipPanel')));

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
        // { path: '/intern-status/add', element: <InternStatusAdd /> },
        { path: '/intern-status/update/:internFormId', element: <InternStatusUpdate /> },
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
      path: '/confidental-report',
      element: <RequireAuth />,
      children: [
        { path: '/confidental-report/', element: <ConfidentalReportList /> },
        { path: '/confidental-report/:confidentalReportId', element: <ConfidentalReportDetail /> },
        { path: '/confidental-report/add', element: <ConfidentalReportAdd /> },
        { path: '/confidental-report/update/:confidentalReportId', element: <ConfidentalReportUpdate /> },
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
};

export default MainRoutes;
