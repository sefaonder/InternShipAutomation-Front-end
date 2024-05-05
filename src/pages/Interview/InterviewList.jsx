import { Paper } from '@mui/material';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetComissionACQuery, useGetStudentACQuery } from 'src/app/api/autocompleteSlice';
import { InternStatusEnum } from 'src/app/enums/internStatus';
import EnhancedTable from 'src/components/data/CustomMUITable';
import CustomTableFilter from 'src/components/data/CustomTableFilter';
import AddButton from 'src/components/inputs/AddButton';
import { useGetInterviewsQuery } from 'src/store/services/interview/interviewApiSlice';
import { clearInterviewData } from 'src/store/services/interview/interviewSlice';

function InterviewList() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [filter, setFilter] = useState({});
  const { data, isLoading, isSuccess, isError, error, refetch, currentData, isFetching } =
    useGetInterviewsQuery(filter);
  console.log('data', data);

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

  useEffect(() => {
    refetch();
    dispatch(clearInterviewData());
  }, [location, navigate]);

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
      id: 'comission',
      numeric: false,
      disablePadding: true,
      label: 'Mülakat Yetkilisi',
      style: 'text-left',
      cellComponent: (value) => <p className="">{value?.name}</p>,
    },
    {
      id: 'date',
      numeric: false,
      disablePadding: true,
      label: 'Mülakat Tarihi',
      style: 'text-left',
      cellComponent: (value) => <p className="">{moment(value?.date).format('DD.MM.YYYY')}</p>,
    },
    {
      id: 'internStatus',
      numeric: false,
      disablePadding: true,
      label: 'Staj Durumu',
      style: 'text-left',
      cellComponent: (value) => <p className="">{InternStatusEnum[value?.status]?.label}</p>,
    },
  ];

  const interviewFilters = [
    { id: 'student', type: 'autocomplete', componentProps: { useACSlice: useGetStudentACQuery, label: 'Öğrenci' } },
    {
      id: 'comission',
      type: 'autocomplete',
      componentProps: { useACSlice: useGetComissionACQuery, label: 'Mülakat yapan' },
    },
    { id: 'status', type: 'enum', componentProps: { enumObject: InternStatusEnum, label: 'Staj durumu' } },
    { id: 'isSealed', type: 'boolean', componentProps: { label: 'Mühürsüz Kayıtlar' } },
  ];

  return (
    <Paper>
      <CustomTableFilter
        filterOptions={interviewFilters}
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
      <AddButton onClick={() => navigate(location.pathname + '/add')} />
    </Paper>
  );
}

export default InterviewList;
