import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';

function CustomEnumInput({ id, value, label, onChange, enumObject, name, sx, required }) {
  console.log('inside value', value);
  return (
    <FormControl sx={sx}>
      <InputLabel id={`select-${id}`}>{label}</InputLabel>
      <Select
        labelId={`select-${id}`}
        id={id}
        value={value}
        label={label}
        onChange={onChange}
        required={required}
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
    </FormControl>
  );
}

export default CustomEnumInput;
