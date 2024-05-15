import { TextField } from '@mui/material';
import React from 'react';

function CustomTextInput({
  id,
  name,
  value,
  onChange,
  label,
  disabled,
  error,
  helperText,
  style,
  startAdornment,
  endAdornment,
  size = 'normal',
  variant = 'outlined',
  multiline,
  rows,
  required,
}) {
  return (
    <TextField
      id={id}
      required={required}
      name={name}
      sx={style}
      value={value}
      label={label}
      onChange={onChange}
      disabled={disabled}
      error={error}
      helperText={helperText}
      size={size}
      variant={variant}
      multiline={multiline}
      rows={rows}
      InputProps={{
        startAdornment: startAdornment,
        endAdornment: endAdornment,
      }}
    />
  );
}

export default CustomTextInput;
