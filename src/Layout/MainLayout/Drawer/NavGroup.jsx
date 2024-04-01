import PropTypes from 'prop-types';

import List from '@mui/material/List';

import React from 'react';
import NavItem from './NavItem';

const NavGroup = ({ navigations }) => {
  return <List>{navigations.map((object, index) => object?.permission && <NavItem item={object} key={index} />)}</List>;
};

NavGroup.propTypes = {
  navigations: PropTypes.array,
};

export default NavGroup;
