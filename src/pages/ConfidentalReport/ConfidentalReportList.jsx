import React from 'react';
import { Paper } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import EnhancedTable from 'src/components/data/CustomMUITable';
import CustomTableFilter from 'src/components/data/CustomTableFilter';
import AddButton from 'src/components/inputs/AddButton';
import { useGetConfidentalReportsQuery } from 'src/store/services/confidentalReport/confidentalReportApiSlice';

const ConfidentalReportList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data, isLoading, isSuccess, isError, error } = useGetConfidentalReportsQuery();

  const headers = [
    {
      id: 'company_name',
      numeric: false,
      disablePadding: true,
      label: 'company_name',
      style: 'text-left',
      cellComponent: (value) => <p className="">{value}</p>,
    },
    {
      id: 'address',
      numeric: false,
      disablePadding: true,
      label: 'address',
      style: 'text-left',
      cellComponent: (value) => <p className="">{value}</p>,
    },
    {
      id: 'start_date',
      numeric: false,
      disablePadding: true,
      label: 'start_date',
      style: 'text-left',
      cellComponent: (value) => <p className="">{value}</p>,
    },
    {
      id: 'end_date',
      numeric: false,
      disablePadding: true,
      label: 'end_date',
      style: 'text-left',
      cellComponent: (value) => <p className="">{value}</p>,
    },
    {
      id: 'days_of_absence',
      numeric: false,
      disablePadding: true,
      label: 'days_of_absence',
      style: 'text-left',
      cellComponent: (value) => <p className=""> {value} </p>,
    },
    {
      id: 'department',
      numeric: false,
      disablePadding: true,
      label: 'department',
      style: 'text-left',
      cellComponent: (value) => <p className="">{value}</p>,
    },
    {
      id: 'is_edu_program',
      numeric: false,
      disablePadding: true,
      label: 'is_edu_program',
      style: 'text-left',
      cellComponent: (value) => <p className="">{value}</p>,
    },
    {
      id: 'auth_name',
      numeric: false,
      disablePadding: true,
      label: 'auth_name',
      style: 'text-left',
      cellComponent: (value) => <p className="">{value}</p>,
    },
    {
      id: 'auth_position',
      numeric: false,
      disablePadding: true,
      label: 'auth_position',
      style: 'text-left',
      cellComponent: (value) => <p className=""> {value} </p>,
    },
    {
      id: 'reg_number',
      numeric: false,
      disablePadding: true,
      label: 'reg_number',
      style: 'text-left',
      cellComponent: (value) => <p className="">{value}</p>,
    },
    {
      id: 'auth_tc_number',
      numeric: false,
      disablePadding: true,
      label: 'auth_tc_number',
      style: 'text-left',
      cellComponent: (value) => <p className="">{value}</p>,
    },
    {
      id: 'auth_title',
      numeric: false,
      disablePadding: true,
      label: 'auth_title',
      style: 'text-left',
      cellComponent: (value) => <p className="">{value}</p>,
    },
  ];
  return (
    <div>
      {' '}
      <Paper>
        <CustomTableFilter />
        <EnhancedTable columns={headers} data={data?.data || []} isLoading={isLoading} />

        <AddButton onClick={() => navigate(location.pathname + '/add')} />
      </Paper>
    </div>
  );
};

export default ConfidentalReportList;
