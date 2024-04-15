import React from 'react';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function CustomDateInput({
  id,
  name,
  value,
  onChange,
  label,
  disabled,
  error,
  helperText,
  minDate,
  maxDate,
  shouldDisableDate,
  style,
}) {
  const handleClear = () => {
    onChange(null);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        name={name}
        format="DD.MM.YYYY"
        sx={style}
        value={value}
        label={label}
        onChange={onChange}
        slotProps={{
          field: { clearable: true, onClear: () => handleClear() },
          textField: {
            id: id,
            name: name,
            error: error,
            helperText: helperText,
          },
        }}
        disabled={disabled}
        minDate={minDate}
        maxDate={maxDate}
        shouldDisableDate={shouldDisableDate}
      />
    </LocalizationProvider>
  );
}

export default CustomDateInput;
