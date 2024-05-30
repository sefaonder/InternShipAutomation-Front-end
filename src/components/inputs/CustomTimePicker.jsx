import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { trTR } from '@mui/x-date-pickers/locales';
import React from 'react';

function CustomTimePicker({
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
  required,
  format = 'HH:mm',
}) {
  const handleClear = () => {
    onChange(null);
  };
  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale="tr"
      localeText={trTR.components.MuiLocalizationProvider.defaultProps.localeText}
    >
      <TimePicker
        name={name}
        format={format}
        sx={style}
        value={value}
        label={label}
        onChange={onChange}
        slotProps={{
          field: { clearable: true, onClear: () => handleClear() },
          textField: {
            id: id,
            name: name,
            required: required,
            error: error,
            helperText: helperText,
          },
        }}
        disabled={disabled}
      />
    </LocalizationProvider>
  );
}

export default CustomTimePicker;
