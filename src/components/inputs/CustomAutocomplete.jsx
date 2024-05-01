import React, { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import { List, ListItem, ListItemButton, ListItemText, useTheme } from '@mui/material';

const CustomAutocomplete = ({
  value,
  sx,
  field,
  onChange,
  label,
  useACSlice,
  error,
  helperText,
  disabled,
  required,
  filterId,
}) => {
  const [inputValue, setInputValue] = useState('');
  const { data: data, isLoading, isSucces } = useACSlice();
  const theme = useTheme();

  function ACLabelFunction(value) {
    return value?.label ? `${value.label}` : '';
  }

  function findLabelValueinId(value, acData) {
    const record = acData.filter((item) => {
      if (item?.id === value?.id) {
        return item;
      }
    });
    return ACLabelFunction(record[0]);
  }

  useEffect(() => {
    if (data?.data) {
      setInputValue(findLabelValueinId(value, data.data));
    }
  }, [value, data]);

  const filterOptions = (options, { inputValue }) => {
    return options.filter((option) => {
      const searchText = value?.id ? '' : inputValue.toLowerCase();
      const { label, subtext, id } = option;
      console.log('filterId', filterId);
      if (Boolean(filterId) && id !== filterId) {
        return false;
      }
      return label.toLowerCase().includes(searchText) || subtext.toLowerCase().includes(searchText);
    });
  };

  return (
    <Autocomplete
      sx={sx}
      disabled={disabled}
      aria-required={required}
      options={data?.data || []}
      loading={isLoading}
      getOptionDisabled={(option) => option.disabled}
      freeSolo
      renderOption={(props, option) => (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <ListItemButton key={option.id} {...props} style={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
            <ListItemText primary={option?.label} secondary={option?.subtext} />
          </ListItemButton>
        </List>
      )}
      getOptionLabel={(option) => ACLabelFunction(option)}
      value={value}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      filterOptions={filterOptions}
      onChange={(event, newValue) => {
        onChange(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        console.log('newInputValue', newInputValue);
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          error={error}
          helperText={helperText}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default CustomAutocomplete;
