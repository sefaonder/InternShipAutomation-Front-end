import { lazy } from 'react';

// project import
import Loadable from 'src/components/loader/Loadable';
import { RequireAuth } from './RequireAuth';
import MainLayout from 'src/Layout/MainLayout';
import { UserRolesEnum } from 'src/app/enums/roleList';

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
      children: [{ path: '/', role: UserRolesEnum.STUDENT.id, element: <DashboardDefault /> }],
    },
    {
      path: '/profile',
      element: <RequireAuth />,
      children: [{ path: '/profile', role: UserRolesEnum.STUDENT.id, element: <ProfileDefault /> }],
    },
    // InternStatusRoutes only for Auth users
    {
      path: '/intern-status',
      element: <RequireAuth />,
      children: [
        { path: '/intern-status/', role: UserRolesEnum.STUDENT.id, element: <InternStatusList /> },
        { path: '/intern-status/:internStatusId', role: UserRolesEnum.STUDENT.id, element: <InternStatusDetail /> },
        {
          path: '/intern-status/update/:internFormId',
          role: UserRolesEnum.COMISSION.id,
          element: <InternStatusUpdate />,
        },
      ],
    },
    // InternFormRoutes only for Auth users
    {
      path: '/intern-form',
      element: <RequireAuth />,
      children: [
        { path: '/intern-form/', role: UserRolesEnum.STUDENT.id, element: <InternFormList /> },
        { path: '/intern-form/:internFormId', role: UserRolesEnum.STUDENT.id, element: <InternFormDetail /> },
        { path: '/intern-form/add', role: UserRolesEnum.STUDENT.id, element: <InternFormAdd /> },
        { path: '/intern-form/update/:internFormId', role: UserRolesEnum.STUDENT.id, element: <InternFormUpdate /> },
      ],
    },
    // InterviewRoutes only for Auth users
    {
      path: '/interview',
      element: <RequireAuth />,
      children: [
        { path: '/interview/', role: UserRolesEnum.STUDENT.id, element: <InterviewList /> },
        { path: '/interview/:interviewId', role: UserRolesEnum.STUDENT.id, element: <InterviewDetail /> },
        { path: '/interview/add', role: UserRolesEnum.COMISSION.id, element: <InterviewAdd /> },
        { path: '/interview/update/:interviewId', role: UserRolesEnum.COMISSION.id, element: <InterviewUpdate /> },
      ],
    },
    // SurveyList Only For Admin & Comission
    {
      path: '/survey',
      element: <RequireAuth />,
      children: [
        { path: '/survey/', role: UserRolesEnum.STUDENT.id, element: <SurveyList /> },
        { path: '/survey/:surveyId', role: UserRolesEnum.STUDENT.id, element: <SurveyDetail /> },
        { path: '/survey/add', role: UserRolesEnum.STUDENT.id, element: <SurveyAdd /> },
        { path: '/survey/update/:surveyId', role: UserRolesEnum.STUDENT.id, element: <SurveyUpdate /> },
      ],
    },
    // confidential-report Only For Admin & Comission
    {
      path: '/confidental-report',
      element: <RequireAuth />,
      role: UserRolesEnum.COMISSION.id,
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
      role: UserRolesEnum.COMISSION.id,
      children: [
        { path: '/user/', element: <UserList /> },
        { path: '/user/:userId', element: <UserDetail /> },
        { path: '/user/add', element: <UserAdd /> },
        { path: '/user/update/:userId', element: <UserUpdate /> },
      ],
    },
    {
      path: '/internship-panel',
      role: UserRolesEnum.ADMIN.id,
      element: <RequireAuth />,
      children: [{ path: '/internship-panel/', element: <InterShipPanel /> }],
    },
  ],
};

export default MainRoutes;
