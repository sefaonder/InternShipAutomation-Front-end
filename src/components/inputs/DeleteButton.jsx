import { Button, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';

function DeleteButton({ variant = 'outlined', onClick, disabled, loading }) {
  return (
    <Button
      color="error"
      variant={variant}
      onClick={onClick}
      disabled={disabled}
      startIcon={loading ? <CircularProgress /> : <DeleteIcon />}
    >
      Sil
    </Button>
  );
}

export default DeleteButton;
