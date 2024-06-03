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
import { InternStatusEnum } from 'src/app/enums/internStatus';
import dayjs from 'dayjs';
import { projectSnackbar } from 'src/app/handlers/ProjectSnackbar';

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
      navigate('/interview');
    }
  }, [isError]);

  useEffect(() => {
    refetch();
  }, [location, navigate]);

  const handleDelete = async () => {
    try {
      const response = await deleteInterview(interviewId);

      if (response.data) {
        projectSnackbar(response.data.message, { variant: 'success' });
      }
    } catch (error) {
      console.log('error', error);
    }
    navigate('/interview');
  };

  const handleSendCompanyConfidental = async () => {
    try {
      const response = await sendCompanyConfidental({ interviewId: interviewId });
      if (response.data) {
        projectSnackbar(response.data.message, { variant: 'success' });
      }
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <CustomCircularProgress />;
  }

  if (isSuccess) {
    interviewData = data.data;
  }

  const accordionData = [
    [{ text: 'Staj Durumu: ', value: InternStatusEnum[data?.data?.internStatus?.status].label }],
    [
      { text: 'Komisyon Adı', value: data?.data?.comission?.name },
      { text: 'Komisyon Soyadı', value: data?.data?.comission?.last_name },
      { text: 'Mülakat Tarihi', value: data?.data?.date ? dayjs(data?.data?.date).format('DD.MM.YYYY HH:mm') : '-' },
    ],

    [
      { text: 'Öğrenci Adı', value: data?.data?.student?.name },
      { text: 'Öğrenci Soyadı', value: data?.data?.student?.last_name },
      { text: 'Okul Numarası', value: data?.data?.student?.school_number },
      { text: 'TC Kimlik No', value: data?.data?.student?.tc_number },
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
          <Container className="flex-col my-2 px-6 gap-4 flex sm:flex-row">
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
