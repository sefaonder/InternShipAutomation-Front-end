import { Paper } from '@mui/material';
import React, { useState } from 'react';
import { useGetComissionACQuery, useGetEduYearACQuery, useGetStudentACQuery } from 'src/app/api/autocompleteSlice';
import { InternStatusEnum } from 'src/app/enums/internStatus';
import EnhancedTable from 'src/components/data/CustomMUITable';
import CustomTableFilter from 'src/components/data/CustomTableFilter';
import AddButton from 'src/components/inputs/AddButton';
import { useGetStatusesQuery } from 'src/store/services/internStatus/internStatusApiSlice';

function InternStatusList() {
  const [filter, setFilter] = useState({});
  const { data, currentData, isLoading, isFetching, isSuccess, isError, error, refetch } = useGetStatusesQuery(filter);

  const handleFilterChange = (values) => {
    const filterPayload = {
      ...values,
      studentId: values.student?.id ? values.student.id : undefined,
      eduYearId: values.eduYear?.id ? values.eduYear.id : undefined,
    };

    const filteredValues = Object.entries(filterPayload).reduce((acc, [key, value]) => {
      if (value !== '' && value !== undefined && value !== null) {
        acc[key] = value;
      }
      return acc;
    }, {});

    setFilter({ ...filteredValues });
  };

  const headers = [
    {
      id: 'student',
      numeric: false,
      disablePadding: true,
      label: 'Öğrenci',
      style: 'text-left',
      cellComponent: (value) => <p className="">{value?.name}</p>,
    },
    {
      id: 'form',
      numeric: false,
      disablePadding: true,
      label: 'Form Yetkilisi',
      style: 'text-left',
      cellComponent: (value) => <p className="">{value?.follow_up.name}</p>,
    },
    {
      id: 'interview',
      numeric: false,
      disablePadding: true,
      label: 'Mülakat Yetkilisi',
      style: 'text-left',
      cellComponent: (value) => <p className="">{value?.comission?.name}</p>,
    },
    {
      id: 'status',
      numeric: false,
      disablePadding: true,
      label: 'Staj Durumu',
      style: 'text-left',
      cellComponent: (value) => <p className="">{InternStatusEnum[value].label}</p>,
    },
  ];

  const internStatusFilters = [
    { id: 'student', type: 'autocomplete', componentProps: { useACSlice: useGetStudentACQuery, label: 'Öğrenci' } },
    { id: 'eduYear', type: 'autocomplete', componentProps: { useACSlice: useGetEduYearACQuery, label: 'Staj Dönemi' } },
    {
      id: 'comission',
      type: 'autocomplete',
      componentProps: { useACSlice: useGetComissionACQuery, label: 'Mülakatı yapan' },
    },
    { id: 'status', type: 'enum', componentProps: { enumObject: InternStatusEnum, label: 'Staj durumu' } },
  ];

  return (
    <Paper>
      <CustomTableFilter
        filterOptions={internStatusFilters}
        filterValues={filter}
        onChangeFilterValues={handleFilterChange}
        setRefresh={() => refetch()}
      />
      <EnhancedTable
        columns={headers}
        data={currentData?.data || []}
        isLoading={isFetching || isLoading}
        isSuccess={isSuccess}
        filter={filter}
        setFilter={(values) => setFilter({ ...filter, ...values })}
      />
    </Paper>
  );
}

export default InternStatusList;
