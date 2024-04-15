import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';

const AddButton = ({ onClick }) => {
  return (
    <IconButton
      sx={{
        position: 'fixed',
        bottom: '1rem',
        right: '1rem',
        padding: '1rem',
        borderRadius: '50%',
        boxShadow: 'inherit',
      }}
      onClick={onClick}
      color="primary"
    >
      <AddIcon />
    </IconButton>
  );
};

export default AddButton;
