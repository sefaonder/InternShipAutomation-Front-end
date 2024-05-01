import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { Button, CircularProgress } from '@mui/material';

function UpdateButton({ variant = 'contained', onClick, disabled, sx, loading }) {
  return (
    <Button
      className="flex shrink-0"
      sx={sx}
      variant={variant}
      onClick={onClick}
      disabled={disabled}
      startIcon={loading ? <CircularProgress /> : <EditIcon />}
    >
      Güncelle
    </Button>
  );
}

export default UpdateButton;
