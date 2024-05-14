import PropTypes from 'prop-types';

import List from '@mui/material/List';

import React from 'react';
import NavItem from './NavItem';
import usePermission from 'src/hooks/usePermission';

const NavGroup = ({ navigations }) => {
  const checkPermission = usePermission();

  return (
    <List>
      {navigations.map(
        (object, index) => checkPermission(object.permission) && <NavItem item={object} key={index} id={index} />,
      )}
    </List>
  );
};

NavGroup.propTypes = {
  navigations: PropTypes.array,
};

export default NavGroup;
