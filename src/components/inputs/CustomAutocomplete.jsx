import React, { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

const CustomAutocomplete = ({
  value,
  field,
  onChange,
  label,
  useACSlice,
  renderOption,
  filterOptions,
  error,
  helperText,
  labelFunc,
}) => {
  const [inputValue, setInputValue] = useState('');
  const { data: data, isLoading } = useACSlice();

  console.log('data', data);
  console.log('value', inputValue);

  useEffect(() => {
    setInputValue(value.name ? `${value.name} ${value.last_name}` : '');
  }, [value]);

  return (
    <Autocomplete
      options={data?.data || []}
      loading={isLoading}
      freeSolo
      renderOption={renderOption}
      getOptionLabel={(option) => (option.name ? `${option.name} ${option.last_name}` : '')}
      value={value?.name || null}
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
