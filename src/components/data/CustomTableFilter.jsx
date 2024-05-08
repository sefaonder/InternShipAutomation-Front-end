import { Box, Button, Collapse, Divider, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import RefreshIcon from '@mui/icons-material/Refresh';
import React, { useState } from 'react';
import CustomAutocomplete from '../inputs/CustomAutocomplete';
import CustomDateInput from '../inputs/CustomDateInput';
import CustomTextInput from '../inputs/CustomTextInput';
import CustomEnumInput from '../inputs/CustomEnumInput';
import { useFormik } from 'formik';
import moment from 'moment';
import CustomBooleanInput from '../inputs/CustomBooleanInput';
import usePermission from 'src/hooks/usePermission';
import { UserRolesEnum } from 'src/app/enums/roleList';
import dayjs from 'dayjs';

function CustomTableFilter({ filterOptions, filterValues, onChangeFilterValues, setRefresh }) {
  const [open, setOpen] = useState(false);

  const checkPermission = usePermission();

  const isAdvancedComission = checkPermission(UserRolesEnum.COMISSION.id);

  const handleSubmit = (values) => {
    console.log('values submitted');
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: filterValues,
    onSubmit: handleSubmit,
  });
  console.log('filterValue', formik.values);

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        flexDirection: 'column',
        display: 'flex',
        width: '100%',
      }}
    >
      <Box sx={{ alignSelf: 'baseline', margin: '0.5rem' }}>
        <Tooltip title="Refresh List">
          <IconButton sx={{ mr: '1rem' }} onClick={() => setRefresh()}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>

        {isAdvancedComission && (
          <Tooltip title="Filter list">
            <IconButton sx={{}} onClick={() => setOpen(!open)}>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      <Divider sx={{ width: '100%' }} />

      <Box sx={{ display: 'flex', width: '100%', mt: '1rem', mb: '1rem' }}>
        <Collapse in={open} sx={{ flexDirection: 'column', display: 'flex', width: '100%' }}>
          <Typography sx={{ marginBottom: '1rem' }} variant="h4">
            Filtreler
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.5rem',
              mt: '1rem',
              mb: '1rem',
              mr: '0.5rem',
              ml: '0.5rem',
            }}
          >
            {filterOptions.map((filterOption) => {
              return (
                <Box sx={{ display: 'inline-block', flexShrink: 0 }}>
                  {filterOption.type === 'autocomplete' && (
                    <CustomAutocomplete
                      name={filterOption.id}
                      sx={{ minWidth: '15rem' }}
                      label={filterOption.componentProps.label}
                      id={filterOption.id}
                      useACSlice={filterOption.componentProps.useACSlice}
                      value={formik.values?.[filterOption?.id]}
                      onChange={(value) => formik.setFieldValue(filterOption.id, value, true)}
                    />
                  )}
                  {filterOption.type === 'date' && (
                    <CustomDateInput
                      name={filterOption.id}
                      label={filterOption.componentProps.label}
                      id={filterOption.id}
                      value={formik.values?.[filterOption?.id] ? dayjs(formik.values?.[filterOption?.id]) : null}
                      onChange={(value) =>
                        formik.setFieldValue(filterOption.id, dayjs(value).format('DD.MM.YYYY'), true)
                      }
                    />
                  )}
                  {filterOption.type === 'text' && (
                    <CustomTextInput
                      name={filterOption.id}
                      label={filterOption.componentProps.label}
                      id={filterOption.id}
                      value={formik.values?.[filterOption?.id]}
                      onChange={(value) => formik.setFieldValue(filterOption.id, value.target.value, true)}
                    />
                  )}
                  {filterOption.type === 'enum' && (
                    <CustomEnumInput
                      sx={{ minWidth: '15rem' }}
                      id={filterOption.id}
                      name={filterOption.id}
                      label={filterOption.componentProps.label}
                      value={formik.values?.[filterOption?.id] || null}
                      onChange={(value) => formik.setFieldValue(filterOption.id, value.target.value, true)}
                      enumObject={filterOption.componentProps.enumObject}
                    />
                  )}
                  {filterOption.type === 'boolean' && (
                    <CustomBooleanInput
                      name={filterOption.id}
                      label={filterOption.componentProps.label}
                      id={filterOption.id}
                      value={formik.values?.[filterOption?.id]}
                      onChange={(value) => formik.setFieldValue(filterOption.id, value, true)}
                    />
                  )}
                </Box>
              );
            })}
          </Box>
          <Button onClick={() => onChangeFilterValues(formik.values)}>Seçili Filtreleri uygula</Button>
          <Button
            onClick={() => {
              onChangeFilterValues({});
              formik.resetForm();
            }}
            color="secondary"
          >
            Bütün filtreleri temizle
          </Button>
        </Collapse>
      </Box>
    </Toolbar>
  );
}

export default CustomTableFilter;
