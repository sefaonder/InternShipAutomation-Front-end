import { Paper } from '@mui/material';
import moment from 'moment';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import EnhancedTable from 'src/components/data/CustomMUITable';
import CustomTableFilter from 'src/components/data/CustomTableFilter';
import AddButton from 'src/components/inputs/AddButton';
import { useGetFormsQuery } from 'src/store/services/internForm/internFormApiSlice';

function InternFormList() {
  const location = useLocation();
  const navigate = useNavigate();
  const { data, isLoading, isSuccess, isError, error } = useGetFormsQuery();

  console.log('data', data);

  const headers = [
    {
      id: 'student',
      numeric: false,
      disablePadding: true,
      label: 'Öğrenci',
      style: 'text-left',
      cellComponent: (value) => <p className="">{value.name}</p>,
    },
    {
      id: 'follow_up',
      numeric: false,
      disablePadding: true,
      label: 'Yetkili',
      style: 'text-left',
      cellComponent: (value) => <p className="">{value.name}</p>,
    },
    {
      id: 'start_date',
      numeric: false,
      disablePadding: true,
      label: 'Staj Başlangıç Tarihi',
      style: 'text-left',
      cellComponent: (value) => <p className="">{moment(value).format('DD.MM.YYYY')}</p>,
    },
    {
      id: 'end_date',
      numeric: false,
      disablePadding: true,
      label: 'Staj Bitiş Tarihi',
      style: 'text-left',
      cellComponent: (value) => <p className="">{moment(value).format('DD.MM.YYYY')}</p>,
    },
    {
      id: 'total_work_day',
      numeric: false,
      disablePadding: true,
      label: 'Toplam Staj Süresi',
      style: 'text-left',
      cellComponent: (value) => <p className="">{value + ' ' + 'Gün'}</p>,
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

export default InternFormList;
