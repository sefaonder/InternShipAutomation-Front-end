import { Paper } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import EnhancedTable from 'src/components/data/CustomMUITable';
import CustomTableFilter from 'src/components/data/CustomTableFilter';
import AddButton from 'src/components/inputs/AddButton';
import { useGetFormsQuery } from 'src/store/services/internForm/internFormApiSlice';

function InternFormList() {
  const location = useLocation();
  const navigate = useNavigate();
  const { data, isLoading, isSuccess, isError, error } = useGetFormsQuery({ eduYear: '2020-2021' });

  console.log('data', data);

  return (
    <Paper>
      <CustomTableFilter />
      {/* <EnhancedTable /> */}
      <AddButton onClick={() => navigate(location.pathname + '/add')} />
    </Paper>
  );
}

export default InternFormList;
