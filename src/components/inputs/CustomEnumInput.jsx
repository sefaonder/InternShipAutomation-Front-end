import { MenuItem, Select } from '@mui/material';
import React from 'react';

function CustomEnumInput({ labelId, id, value, label, onChange, enumObject, name }) {
  return (
    <Select labelId={labelId} id={id} value={value} label={label} onChange={onChange} name={name}>
      {Object.values(enumObject).map((item) => (
        <MenuItem value={item.id}>{item.label}</MenuItem>
      ))}
    </Select>
  );
}

export default CustomEnumInput;
