import { FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import React from 'react';

function CustomEnumInput({ id, value, label, onChange, enumObject, name, sx, required, error, helperText }) {
  console.log('inside value', value);
  return (
    <FormControl sx={sx}>
      <InputLabel required={required} id={`select-${id}`}>
        {label}
      </InputLabel>
      <Select
        labelId={`select-${id}`}
        id={id}
        value={value}
        label={label}
        error={error}
        input={<OutlinedInput label={label} error={error} />}
        onChange={onChange}
        name={name}
        defaultValue=""
      >
        <MenuItem key={'none'} disabled value={null}>
          <em>Hiçbiri</em>
        </MenuItem>
        {Object.values(enumObject).map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText error={error}>{error && helperText}</FormHelperText>
    </FormControl>
  );
}

export default CustomEnumInput;
