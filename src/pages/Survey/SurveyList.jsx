import { Paper } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import EnhancedTable from 'src/components/data/CustomMUITable';
import CustomTableFilter from 'src/components/data/CustomTableFilter';
import AddButton from 'src/components/inputs/AddButton';
import { useGetSurveysQuery } from 'src/store/services/survey/surveyApiSlice';

const SurveyList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data, isLoading, isSuccess, isError, error } = useGetSurveysQuery();

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
      id: 'company_address',
      numeric: false,
      disablePadding: true,
      label: 'company_address',
      style: 'text-left',
      cellComponent: (value) => <p className="">{value}</p>,
    },
    {
      id: 'teach_type',
      numeric: false,
      disablePadding: true,
      label: 'teach_type',
      style: 'text-left',
      cellComponent: (value) => <p className="">{value}</p>,
    },
    {
      id: 'gano',
      numeric: false,
      disablePadding: true,
      label: 'gano',
      style: 'text-left',
      cellComponent: (value) => <p className="">{value}</p>,
    },
    {
      id: 'intern_group',
      numeric: false,
      disablePadding: true,
      label: 'intern_group',
      style: 'text-left',
      cellComponent: (value) => <p className=""> {value} </p>,
    },
    {
      id: 'intern_type',
      numeric: false,
      disablePadding: true,
      label: 'intern_type',
      style: 'text-left',
      cellComponent: (value) => <p className="">{value}</p>,
    },
    {
      id: 'date',
      numeric: false,
      disablePadding: true,
      label: 'date',
      style: 'text-left',
      cellComponent: (value) => <p className="">blablabla</p>,
    },
  ];
  return (
    <Paper>
      <CustomTableFilter />
      <EnhancedTable columns={headers} data={data?.data || []} isLoading={isLoading} />

      <AddButton onClick={() => navigate(location.pathname + '/add')} />
    </Paper>
  );
};

export default SurveyList;
