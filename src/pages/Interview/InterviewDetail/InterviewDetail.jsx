import { CircularProgress } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetInterviewDetailQuery } from 'src/store/services/interview/interviewApiSlice';
import { setInterviewData } from 'src/store/services/interview/interviewSlice';

function InterviewDetail() {
  const dispatch = useDispatch();

  const { interviewId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isSuccess, isError, error } = useGetInterviewDetailQuery(interviewId);

  let interviewData = {};

  useEffect(() => {
    if (isSuccess && data.data) {
      dispatch(setInterviewData(data?.data));
    }
  }, [isSuccess]);

  console.log('data', data);
  if (isLoading) {
    return <CircularProgress />;
  }

  if (isSuccess) {
    interviewData = data.data;
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
        <Button onClick={() => navigate('/interview/update/' + interviewId)}>Güncelle</Button>
      </Paper>
      <Box className="flex flex-col sm:flex-row gap-4">
        <Paper sx={{ flex: 2, padding: '1rem' }}>Main Card</Paper>
        <RecordTraceCard record={interviewData} />
      </Box>
    </div>
  );
}

export default InterviewDetail;
