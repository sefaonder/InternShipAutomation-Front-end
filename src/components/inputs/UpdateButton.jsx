import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';

function UpdateButton({ variant = 'contained', onClick, disabled }) {
  return (
    <Button variant={variant} onClick={onClick} disabled={disabled} startIcon={<EditIcon />}>
      Güncelle
    </Button>
  );
}

export default UpdateButton;
