import React from 'react';
import InternFormAdd from './InternFormAdd';
import { useGetInterviewDetailQuery } from 'src/store/services/interview/interviewApiSlice';
import { useParams } from 'react-router-dom';
import { useGetFormDetailQuery } from 'src/store/services/internForm/internFormApiSlice';

function InternFormUpdate() {
  const { internFormId } = useParams();
  const { data, isLoading, isSuccess, isError, error } = useGetFormDetailQuery(internFormId);
  return (
    <div>
      <InternFormAdd internForm={data} internFormId={internFormId} isLoadingState={isLoading} />
    </div>
  );
}

export default InternFormUpdate;
