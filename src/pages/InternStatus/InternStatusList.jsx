import { Paper } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { InternStatusEnum } from 'src/app/enums/internStatus';
import EnhancedTable from 'src/components/data/CustomMUITable';
import CustomTableFilter from 'src/components/data/CustomTableFilter';
import AddButton from 'src/components/inputs/AddButton';
import { useGetStatusesQuery } from 'src/store/services/internStatus/internStatusApiSlice';

function InternStatusList() {
  const location = useLocation();
  const navigate = useNavigate();
  const { data, isLoading, isSuccess, isError, error } = useGetStatusesQuery();
  console.log('data', data);

  const headers = [
    {
      id: 'user',
      numeric: false,
      disablePadding: true,
      label: 'Öğrenci',
      style: 'text-left',
      cellComponent: (value) => <p className="">{value.name}</p>,
    },
    {
      id: 'form',
      numeric: false,
      disablePadding: true,
      label: 'Form Yetkilisi',
      style: 'text-left',
      cellComponent: (value) => <p className="">{value.follow_up.name}</p>,
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

  return (
    <Paper>
      <CustomTableFilter />
      <EnhancedTable columns={headers} data={data?.data || []} isLoading={isLoading} />
      {/* <AddButton onClick={() => navigate(location.pathname + '/add')} /> */}
    </Paper>
  );
}

export default InternStatusList;
