import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

import { CircularProgress, Typography } from '@mui/material';
import _ from 'lodash';

function CustomSelectList({ data, checked, handleToggle, loading }) {
  if (loading) {
    return <CircularProgress />;
  }

  if (!_.isArray(data) && !data?.length > 0) {
    return <Typography>No data</Typography>;
  }

  return (
    <List sx={{ maxHeight: '30rem', bgcolor: 'background.paper', overflowY: 'scroll' }}>
      {data.map((value, index) => {
        const labelId = `checkbox-list-label-${index}`;

        return (
          <ListItem key={value.index}>
            <ListItemButton role={undefined} onClick={handleToggle(value.id)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(value.id) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value.id} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}

export default CustomSelectList;
