import AbcIcon from '@mui/icons-material/Abc';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PeopleIcon from '@mui/icons-material/People';
import PollIcon from '@mui/icons-material/Poll';
import MailLockIcon from '@mui/icons-material/MailLock';
import ImportantDevicesIcon from '@mui/icons-material/ImportantDevices';
import EventIcon from '@mui/icons-material/Event';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import { UserRolesEnum } from 'src/app/enums/roleList';
import i18n from 'src/locales/i18n';

// TODO: we need to add role control
// TODO: path must be connected to main drawer component

const t = i18n.t;

const NavBarItems = [
  {
    title: t('PAGES.DASHBOARD.TITLE'),
    Icon: <SpaceDashboardIcon />,
    path: '/',
    permission: UserRolesEnum.STUDENT.id,
  },
  {
    title: t('PAGES.INTERN_STATUS.TITLE'),
    Icon: <ChecklistRtlIcon />,
    path: '/intern-status',
    permission: UserRolesEnum.STUDENT.id,
  },
  {
    title: t('PAGES.INTERN_FORM.TITLE'),
    Icon: <ListAltIcon />,
    path: '/intern-form',
    permission: UserRolesEnum.STUDENT.id,
  },
  {
    title: t('PAGES.INTERVIEW.TITLE'),
    Icon: <EventIcon />,
    path: '/interview',
    permission: UserRolesEnum.STUDENT.id,
  },
  {
    title: t('PAGES.SURVEY.TITLE'),
    Icon: <PollIcon />,
    path: '/survey',
    permission: UserRolesEnum.STUDENT.id,
  },
  {
    title: t('PAGES.CONFIDENTAL_REPORT.TITLE'),
    Icon: <MailLockIcon />,
    path: '/confidental-report',
    permission: UserRolesEnum.COMISSION.id,
  },
  {
    title: t('PAGES.USER.TITLE'),
    Icon: <PeopleIcon />,
    path: '/user',
    permission: UserRolesEnum.COMISSION.id,
  },
  {
    title: t('PAGES.INTERNSHIP_PANEL.TITLE'),
    Icon: <ImportantDevicesIcon />,
    path: '/internship-panel',
    permission: UserRolesEnum.ADMIN.id,
  },
];
export default NavBarItems;
