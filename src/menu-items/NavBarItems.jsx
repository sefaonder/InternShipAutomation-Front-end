import AbcIcon from '@mui/icons-material/Abc';

// TODO: we need to add role control
// TODO: path must be connected to main drawer component
const NavBarItems = [
  {
    title: 'Dashboard',
    Icon: <AbcIcon />,
    path: '/',
    permission: true,
  },
  {
    title: 'Intern Status',
    Icon: <AbcIcon />,
    path: '/intern-status',
    permission: true,
  },
  {
    title: 'Intern Form',
    Icon: <AbcIcon />,
    path: '/intern-form',
    permission: true,
  },
  {
    title: 'Interview',
    Icon: <AbcIcon />,
    path: '/interview',
    permission: true,
  },
  {
    title: 'Survey',
    Icon: <AbcIcon />,
    path: '/survey',
    permission: true,
  },
  {
    title: 'Confidential Report',
    Icon: <AbcIcon />,
    path: '/confidential-report',
    permission: true,
  },
  {
    title: 'User',
    Icon: <AbcIcon />,
    path: '/user',
    permission: true,
  },
  {
    title: 'Internship Panel',
    Icon: <AbcIcon />,
    path: '/internship-panel',
    permission: true,
  },
];
export default NavBarItems;
