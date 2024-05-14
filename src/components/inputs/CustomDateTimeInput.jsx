import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { trTR } from '@mui/x-date-pickers/locales';
import React from 'react';

function CustomDateTimeInput({
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
  format = 'DD.MM.YYYY - HH:mm',
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
      <DateTimePicker
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
        minDate={minDate}
        maxDate={maxDate}
        shouldDisableDate={shouldDisableDate}
      />
    </LocalizationProvider>
  );
}

export default CustomDateTimeInput;
