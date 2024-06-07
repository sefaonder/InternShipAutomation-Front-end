import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, Drawer, Typography, useMediaQuery } from '@mui/material';
import NavGroup from './NavGroup';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import MiniDrawerStyled from './MiniDrawerStyled';
import logo from '/images/uuLogoRenkli.png';
import { Link } from 'react-router-dom';
import HeaderTitle from './HeaderTitle';
const MainDrawer = ({ open, handleDrawerToggle, window, navigations }) => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));
  const drawerWidth = 240;

  // responsive drawer container
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box component="nav" sx={{ flexShrink: { md: 0 }, zIndex: 1300 }} aria-label="mailbox folders">
      {!matchDownMD ? (
        <MiniDrawerStyled variant="permanent" open={open}>
          <Toolbar className="px-4 flex justify-between">
            <Link to="/" className="flex justify-between items-center gap-1.5">
              <Avatar className="p-0 m-0" alt="Remy Sharp" src={logo} />
              <HeaderTitle />
            </Link>
          </Toolbar>
          <Divider />
          <NavGroup navigations={navigations} />
        </MiniDrawerStyled>
      ) : (
        <Drawer
          container={container}
          variant="temporary"
          open={open}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', lg: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRight: `1px solid ${theme.palette.divider}`,
              backgroundImage: 'none',
              boxShadow: 'inherit',
            },
          }}
        >
          <Toolbar className="px-4 flex justify-between">
            <Avatar alt="Remy Sharp" src={logo} />
            <HeaderTitle />
          </Toolbar>
          <Divider />
          <NavGroup navigations={navigations} />
        </Drawer>
      )}
    </Box>
  );
};

MainDrawer.propTypes = {
  open: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  navigations: PropTypes.array,
  window: PropTypes.object,
};

export default MainDrawer;
