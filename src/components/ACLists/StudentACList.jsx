import { ListItem, ListItemText } from '@mui/material';
import React from 'react';

function StudentACList(props) {
  console.log('props22', props);
  return (
    <div>
      {props.children.map((option) => (
        <ListItem type="ul" key={option[1].id}>
          <ListItemText primary={`${option[1].name} ${option[1].last_name}`} />
        </ListItem>
      ))}
    </div>
  );
}

export default StudentACList;
