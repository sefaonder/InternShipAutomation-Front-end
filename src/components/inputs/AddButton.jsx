import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';

const AddButton = ({ onClick }) => {
  return (
    <IconButton onClick={onClick} color="primary">
      <AddIcon />
    </IconButton>
  );
};

export default AddButton;
