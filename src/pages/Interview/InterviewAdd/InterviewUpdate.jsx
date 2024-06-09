import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetInterviewDetailQuery } from 'src/store/services/interview/interviewApiSlice';
import InterviewAdd from './InterviewAdd';
import { Backdrop, CircularProgress } from '@mui/material';

function InterviewUpdate() {
  const { interviewId } = useParams();
  const { data, isLoading, isSuccess, isError, error } = useGetInterviewDetailQuery(interviewId);

  if (isLoading) {
    return (
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 999 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }
  return (
    <div>
      <InterviewAdd interview={data} interviewId={interviewId} isLoadingState={isLoading} />
    </div>
  );
}

export default InterviewUpdate;
