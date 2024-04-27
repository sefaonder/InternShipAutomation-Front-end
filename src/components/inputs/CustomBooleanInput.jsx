import { FormControlLabel, FormGroup, Switch } from '@mui/material';
import React from 'react';

function CustomBooleanInput({ sx, value, onChange, label, id, name }) {
  const handleChange = (event) => {
    console.log('event', event.target.checked);
    onChange(Boolean(event.target.checked));
  };
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch
            id={id}
            sx={sx}
            name={name}
            checked={value || false}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        }
        label={label}
      />
    </FormGroup>
  );
}

export default CustomBooleanInput;
