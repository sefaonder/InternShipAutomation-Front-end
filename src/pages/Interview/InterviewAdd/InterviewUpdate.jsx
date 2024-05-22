import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetInterviewDetailQuery } from 'src/store/services/interview/interviewApiSlice';
import InterviewAdd from './InterviewAdd';

function InterviewUpdate() {
  const { interviewId } = useParams();
  const { data, isLoading, isSuccess, isError, error } = useGetInterviewDetailQuery(interviewId);
  return (
    <div>
      <InterviewAdd interview={data} interviewId={interviewId} isLoadingState={isLoading} />
    </div>
  );
}

export default InterviewUpdate;
