import { Button, CircularProgress } from '@mui/material';
import React from 'react';

function CustomIconButton({ variant = 'outlined', onClick, disabled, sx, loading, Icon, text, name, id, color }) {
  return (
    <Button
      className="flex shrink-0"
      sx={sx}
      name={name}
      id={id}
      color={color}
      variant={variant}
      onClick={onClick}
      disabled={disabled}
      startIcon={loading ? <CircularProgress /> : Icon}
    >
      {text}
    </Button>
  );
}

export default CustomIconButton;
