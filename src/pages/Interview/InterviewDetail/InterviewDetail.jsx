import { Box, Button, CircularProgress, Container, Paper, Tooltip, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import CustomDetailPageBox from 'src/components/inputs/CustomDetailPageBox';
import DeleteButton from 'src/components/inputs/DeleteButton';
import UpdateButton from 'src/components/inputs/UpdateButton';
import RecordTraceCard from 'src/components/recordTraceCard/RecordTraceCard';
import {
  useDeleteInterviewMutation,
  useGetInterviewDetailQuery,
  useSendCompanyConfidentalMutation,
} from 'src/store/services/interview/interviewApiSlice';
import { setInterviewData } from 'src/store/services/interview/interviewSlice';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import NavigateLink from 'src/components/details/NavigateLink';
import usePermission from 'src/hooks/usePermission';
import { UserRolesEnum } from 'src/app/enums/roleList';
import CustomIconButton from 'src/components/inputs/CustomIconButton';
import InterviewAlert from 'src/components/details/InterviewAlert';
import CustomCircularProgress from 'src/components/loader/CustomCircularProgress';

function InterviewDetail() {
  const dispatch = useDispatch();

  const { interviewId } = useParams();

  const navigate = useNavigate();
  const location = useLocation();

  const { data, isLoading, isSuccess, isError, error, refetch } = useGetInterviewDetailQuery(interviewId);
  const [deleteInterview, { isLoading: isLoadingDelete }] = useDeleteInterviewMutation();
  const [sendCompanyConfidental, { isLoading: isLoadingSend }] = useSendCompanyConfidentalMutation();

  const checkPermission = usePermission();

  const isAdvancedComission = checkPermission(UserRolesEnum.COMISSION.id);

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

  const handleDelete = async () => {
    // TODO: snackbar
    try {
      const response = await deleteInterview(interviewId).unwrap();
    } catch (error) {
      console.log('error', error);
    }
    navigate('/interview');
  };

  const handleSendCompanyConfidental = async () => {
    // TODO: snackbar
    try {
      const response = await sendCompanyConfidental({ interviewId: interviewId }).unwrap();
      refetch();
    } catch (error) {
      console.log('error', error);
    }
  };

  console.log('data', data);
  if (isLoading) {
    return <CustomCircularProgress />;
  }

  if (isSuccess) {
    interviewData = data.data;
  }

  const accordionData = [
    [
      { text: 'Statüs: ', value: data?.data?.internStatus?.status },
      { text: 'Mühür: ', value: data?.data.status ? 'Mühürlü değil' : 'Mühürlü' },
    ],
    [
      { text: 'Komisyon Adı: ', value: data?.data?.comission?.name },
      { text: 'Soyadı: ', value: data?.data?.comission?.last_name },
    ],

    [
      { text: 'Öğrenci Ad: ', value: data?.data?.student?.name },
      { text: 'Öğrenci Soyadı: ', value: data?.data?.student?.last_name },
      { text: 'Okul Numarası: ', value: data?.data?.student?.school_number },
      { text: 'Tc Kimlik No: ', value: data?.data?.student?.tc_number },
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
          gap: '1rem',
        }}
      >
        <DeleteButton variant="outlined" onClick={handleDelete} />
        <UpdateButton
          loading={isLoading}
          variant="outlined"
          onClick={() => navigate('/interview/update/' + interviewId)}
        />

        {!data?.data?.confidentalReport?.id && (
          <Tooltip title="Firmaya Doldurup imzalaması için Sicil Fişini ilet">
            <CustomIconButton
              onClick={handleSendCompanyConfidental}
              color={'secondary'}
              loading={isLoadingSend}
              disabled={isLoadingSend}
              Icon={<ForwardToInboxIcon />}
              text={'Sicil Fişini Ilet'}
            />
          </Tooltip>
        )}
      </Paper>
      <Box className="flex flex-col sm:flex-row gap-4">
        <Paper sx={{ flex: 2 }}>
          <Container className="my-2 px-6 gap-2 flex">
            <NavigateLink text={'İlgili Staj Durumu'} linkId={data?.data?.internStatus?.id} route={'intern-status'} />
            {isAdvancedComission && (
              <NavigateLink
                text={'İlgili Sicil Fişi'}
                linkId={data?.data?.confidentalReport?.id}
                route={'confidental-report'}
              />
            )}
            <NavigateLink
              text={'İlgili Öğrenci Değerlendirme Anketi'}
              linkId={data?.data?.survey?.id}
              route={'survey'}
            />
          </Container>
          <CustomDetailPageBox data={accordionData} />
        </Paper>
        <Box className="flex flex-1 flex-col gap-4">
          <InterviewAlert />
          <RecordTraceCard record={interviewData} />
        </Box>
      </Box>
    </div>
  );
}

export default InterviewDetail;
