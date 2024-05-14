import { Box, CircularProgress, Divider, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import dayjs from 'dayjs';

function CustomActionList({ header, listData, onDelete, loading, itemHandler }) {
  if (loading) {
    return <CircularProgress />;
  }
  return (
    <Box>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        {header}
      </Typography>
      <List disablePadding>
        {listData &&
          listData.map((item, index) => (
            <Box key={item.id}>
              <ListItem
                key={item.id}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={() => onDelete(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={itemHandler(item)} />
              </ListItem>
              <Divider component="li" />
            </Box>
          ))}
      </List>
    </Box>
  );
}

export default CustomActionList;
