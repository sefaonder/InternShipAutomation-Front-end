import React from 'react';
import ConfidentalReportAdd from './ConfidentalReportAdd';
import { useGetConfidentalReportQuery } from 'src/store/services/confidentalReport/confidentalReportApiSlice';
import { useParams } from 'react-router-dom';

const ConfidentalReportUpdate = () => {
  const { confidentalReportId } = useParams();
  const { data, isLoading, isSuccess, isError, error } = useGetConfidentalReportQuery(confidentalReportId);
  return (
    <div>
      <ConfidentalReportAdd confidentalReport={data} confidentalReportId={confidentalReportId} />
    </div>
  );
};

export default ConfidentalReportUpdate;
