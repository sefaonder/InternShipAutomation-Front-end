import { Box, Button, CircularProgress, Paper } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import RecordTraceCard from 'src/components/recordTraceCard/RecordTraceCard';
import { useGetStatusDetailQuery } from 'src/store/services/internStatus/internStatusApiSlice';
import { setInternStatusData } from 'src/store/services/internStatus/internStatusSlice';

function InternStatusDetail() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { internStatusId } = useParams();

  const { data, isLoading, isSuccess, isError, error, refetch } = useGetStatusDetailQuery(internStatusId);

  let internStatusData = {};

  useEffect(() => {
    if (isSuccess && data.data) {
      dispatch(setInternStatusData(data?.data));
    }
  }, [isSuccess]);

  useEffect(() => {
    refetch();
  }, [location, navigate]);

  console.log('data', data);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isSuccess) {
    internStatusData = data.data;
  }

  return (
    <div>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'row-reverse',
          padding: '1rem',
          marginBottom: '1rem',
        }}
      >
        <Button onClick={() => navigate('/intern-status/update/' + internStatusId)}>Güncelle</Button>
      </Paper>
      <Box className="flex flex-col sm:flex-row gap-4">
        <Paper sx={{ flex: 2, padding: '1rem' }}>Main Card</Paper>
        <RecordTraceCard record={internStatusData} />
      </Box>
    </div>
  );
}

export default InternStatusDetail;
