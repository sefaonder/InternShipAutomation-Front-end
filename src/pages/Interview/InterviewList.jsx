import { Paper } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import EnhancedTable from 'src/components/data/CustomMUITable';
import CustomTableFilter from 'src/components/data/CustomTableFilter';
import AddButton from 'src/components/inputs/AddButton';
import { useGetInterviewsQuery } from 'src/store/services/interview/interviewApiSlice';

function InterviewList() {
  const location = useLocation();
  const navigate = useNavigate();
  const { data, isLoading, isSuccess, isError, error } = useGetInterviewsQuery();
  console.log('data', data);

  const headers = [
    {
      id: 'intern',
      numeric: false,
      disablePadding: true,
      label: 'Öğrenci',
      style: 'text-left',
      cellComponent: (value) => <p className="">{value.name}</p>,
    },
    {
      id: 'comission',
      numeric: false,
      disablePadding: true,
      label: 'Mülakat Yetkilisi',
      style: 'text-left',
      cellComponent: (value) => <p className="">{value.name}</p>,
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
      id: 'InternStatus',
      numeric: false,
      disablePadding: true,
      label: 'Staj Durumu',
      style: 'text-left',
      cellComponent: (value) => <p className="">{InternStatusEnum[value.status].label}</p>,
    },
  ];

  return (
    <Paper>
      <CustomTableFilter />
      <EnhancedTable columns={headers} data={data?.data || []} isLoading={isLoading} />
      <AddButton onClick={() => navigate(location.pathname + '/add')} />
    </Paper>
  );
}

export default InterviewList;
