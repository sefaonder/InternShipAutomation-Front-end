import {
  Checkbox,
  FormControl,
  FormHelperText,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material';
import React from 'react';

function CustomBooleanMultiSelectInput({
  sx,
  value,
  name,
  onChange,
  label,
  id,
  options,
  disableOption,
  error,
  helpertext,
  required,
}) {
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    onChange(value);
  };

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
        name={name}
        required={required}
        multiple
        onChange={handleChange}
        input={<OutlinedInput label={label} error={error} required={required} />}
        renderValue={(selected) => {
          return options
            .filter((object) => selected.includes(object.id))
            .map((object) => object.name)
            .join(', ');
        }}
        // MenuProps={MenuProps}
      >
        {options.map((item) => (
          <MenuItem disabled={item.id === disableOption} key={item.id} value={item.id}>
            <Checkbox checked={value.indexOf(item.id) > -1} />
            <ListItemText primary={item.name} />
          </MenuItem>
        ))}
      </Select>
      <FormHelperText error={error}>{error && helpertext}</FormHelperText>
    </FormControl>
  );
}

export default CustomBooleanMultiSelectInput;
