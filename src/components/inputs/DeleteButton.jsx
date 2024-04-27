import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';

function DeleteButton({ variant = 'contained', onClick, disabled }) {
  return (
    <Button variant={variant} onClick={onClick} disabled={disabled} startIcon={<DeleteIcon />}>
      Sil
    </Button>
  );
}

export default DeleteButton;
