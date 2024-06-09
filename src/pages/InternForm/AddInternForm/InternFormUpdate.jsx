import React from 'react';
import InternFormAdd from './InternFormAdd';
import { useGetInterviewDetailQuery } from 'src/store/services/interview/interviewApiSlice';
import { useParams } from 'react-router-dom';
import { useGetFormDetailQuery } from 'src/store/services/internForm/internFormApiSlice';
import { Backdrop, CircularProgress } from '@mui/material';

function InternFormUpdate() {
  const { internFormId } = useParams();
  const { data, isLoading, isSuccess, isError, error } = useGetFormDetailQuery(internFormId);

  if (isLoading) {
    return (
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 999 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }
  return (
    <div>
      <InternFormAdd internForm={data} internFormId={internFormId} isLoadingState={isLoading} />
    </div>
  );
}

export default InternFormUpdate;
