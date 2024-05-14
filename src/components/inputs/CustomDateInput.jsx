import React from 'react';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/tr';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { trTR } from '@mui/x-date-pickers/locales';

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
  required,
  format = 'DD.MM.YYYY',
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
      <DatePicker
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

export default CustomDateInput;
