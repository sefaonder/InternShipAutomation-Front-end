import { Box, Button, CircularProgress, Container, Paper, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import CustomDetailPageBox from 'src/components/inputs/CustomDetailPageBox';
import RecordTraceCard from 'src/components/recordTraceCard/RecordTraceCard';
import { useGetInterviewDetailQuery } from 'src/store/services/interview/interviewApiSlice';
import { setInterviewData } from 'src/store/services/interview/interviewSlice';
import CallMadeSharpIcon from '@mui/icons-material/CallMadeSharp';

function InterviewDetail() {
  const dispatch = useDispatch();

  const { interviewId } = useParams();

  const navigate = useNavigate();
  const location = useLocation();

  const { data, isLoading, isSuccess, isError, error, refetch } = useGetInterviewDetailQuery(interviewId);
  let interviewData = {};

  useEffect(() => {
    if (isSuccess && data.data) {
      dispatch(setInterviewData(data?.data));
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error) {
      //TODO:  error snackbar
      navigate('/interview');
    }
  }, [isError]);

  useEffect(() => {
    refetch();
  }, [location, navigate]);

  console.log('data', data);
  if (isLoading) {
    return <CircularProgress />;
  }

  if (isSuccess) {
    interviewData = data.data;
  }

  const accordionData = [
    [
      { text: 'Statüs: ', value: data?.data.internStatus.status },
      { text: 'Mühür: ', value: data?.data.status ? 'Mühürlü değil' : 'Mühürlü' },
    ],
    [
      { text: 'Komisyon Adı: ', value: data?.data.comission.name },
      { text: 'Soyadı: ', value: data?.data.comission.last_name },
    ],

    [
      { text: 'Öğrenci Ad: ', value: data?.data.student.name },
      { text: 'Öğrenci Soyadı: ', value: data?.data.student.last_name },
      { text: 'Okul Numarası: ', value: data?.data.student.school_number },
      { text: 'Tc Kimlik No: ', value: data?.data.student.tc_number },
    ],
  ];

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
        <Paper sx={{ flex: 2 }}>
          <Container className="my-2 px-6 gap-2 flex">
            {data?.data.internStatus && (
              <Link to={`/intern-status/${data.data?.internStatus.id}`}>
                <span className="underline">InternStatus</span>
                <CallMadeSharpIcon className="text-sm text-black" />
              </Link>
            )}
          </Container>
          <CustomDetailPageBox data={accordionData} />
        </Paper>
        <RecordTraceCard record={interviewData} />
      </Box>
    </div>
  );
}

export default InterviewDetail;
