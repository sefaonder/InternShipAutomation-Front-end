import { IconButton, Toolbar, Tooltip } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import React from 'react';

function CustomTableFilter() {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Tooltip title="Filter list">
        <IconButton>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
}

export default CustomTableFilter;
