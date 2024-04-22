import { ListItem, ListItemText } from '@mui/material';
import React from 'react';

function InternFormACList(props) {
  return (
    <div>
      {props?.children?.map((option) => (
        <ListItem type="ul" key={option[1].id}>
          <ListItemText primary={`${option[1].id}`} />
        </ListItem>
      ))}
    </div>
  );
}

export default InternFormACList;
