import { Box, Button, CircularProgress, Paper, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  useDeleteSurveyMutation,
  useGetSurveyQuery,
  useUnlockSurveyMutation,
} from 'src/store/services/survey/surveyApiSlice';
import moment from 'moment';
import { dataInterm, dataMulti, dataSingle } from '../SurveyComponents/SurveyQs';
import { useDispatch, useSelector } from 'react-redux';
import { setSurvey } from 'src/store/services/survey/surveySlice';
import { PDFDownloadLink } from '@react-pdf/renderer';
import DownloadButton from 'src/components/inputs/DownloadButton';
import UpdateButton from 'src/components/inputs/UpdateButton';
import PdfSurvey from 'src/PDF/survey/PdfSurvey';

import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import usePermission from 'src/hooks/usePermission';
import { UserRolesEnum } from 'src/app/enums/roleList';
import CustomIconButton from 'src/components/inputs/CustomIconButton';
import DeleteButton from 'src/components/inputs/DeleteButton';
import SealedRecordAlert from 'src/components/details/SealedRecordAlert';
import RecordTraceCard from 'src/components/recordTraceCard/RecordTraceCard';

const SurveyDetail = () => {
  const { surveyId } = useParams();
  const { data, isLoading, isSuccess, isError, error, refetch, currentData } = useGetSurveyQuery(surveyId);

  const [deleteSurvey, { isLoading: isLoadingDeleteSurvey }] = useDeleteSurveyMutation();

  const [unlockSurvey, { isLoading: isLoadingUnlockSurvey }] = useUnlockSurveyMutation();

  const [mixedSingleQuestions, setMixedSingleQuestions] = useState();
  const [mixedMultiQuestions, setMixedMultiQuestions] = useState();
  const [mixedIntermQuestions, setIntermMultiQuestions] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const checkPermission = usePermission();

  const isAdvancedComission = checkPermission(UserRolesEnum.COMISSION.id);

  let mixedSingle;
  let mixedMulti;
  let mixedInterm;

  useEffect(() => {
    if (data?.data) {
      mixedSingle = data?.data.answers?.slice(0, 27).map((eleman1, index) => ({
        answer: eleman1,
        question: dataSingle[index]?.question,
      }));
      mixedMulti = data?.data.answers?.slice(27, 31).map((eleman1, index) => ({
        answer: eleman1,
        question: dataMulti[index]?.question,
      }));
      mixedInterm = data?.data.answers?.slice(31).map((eleman1, index) => ({
        answer: eleman1,
        question: dataInterm[index]?.question,
      }));
      setMixedMultiQuestions(mixedMulti);
      setMixedSingleQuestions(mixedSingle);
      setIntermMultiQuestions(mixedInterm);
      dispatch(setSurvey(currentData.data));
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error) {
      //TODO:  error snackbar
      navigate('/survey');
    }
  }, [isError]);

  useEffect(() => {
    refetch();
  }, [location, navigate]);

  const handleDelete = async () => {
    try {
      const response = await deleteSurvey(surveyId).unwrap();
    } catch (error) {
      console.log('error', error);
    }
    navigate('/intern-form');
  };

  const handleUnlock = async () => {
    try {
      const response = await unlockSurvey(surveyId).unwrap();
    } catch (error) {
      console.log('error', error);
    }
    refetch();
  };

  console.log('data', data);
  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'row-reverse',
          padding: '1rem',
          marginBottom: '1rem',
          marginTop: '1rem',
          overflowX: 'auto',
          gap: '1rem',
        }}
      >
        {isAdvancedComission && (
          <DeleteButton
            onClick={handleDelete}
            variant="outlined"
            loading={isLoadingDeleteSurvey}
            disabled={isLoadingDeleteSurvey}
          />
        )}
        {isAdvancedComission && (
          <CustomIconButton
            onClick={handleUnlock}
            color={'warning'}
            loading={isLoadingUnlockSurvey}
            disabled={isLoadingUnlockSurvey}
            Icon={data?.data?.isSealed ? <LockOpenIcon /> : <LockIcon />}
            text={data?.data?.isSealed ? 'Mührü aç' : 'Mühürle'}
          />
        )}
        <UpdateButton loading={isLoading} variant="outlined" onClick={() => navigate('/survey/update/' + surveyId)}>
          Güncelle
        </UpdateButton>
        {data?.data && (
          <PDFDownloadLink fileName="FORM" document={<PdfSurvey data={data?.data} />}>
            {({ loading }) =>
              loading ? (
                <DownloadButton variant="outlined" loading={loading} text={'Loading...'}></DownloadButton>
              ) : (
                <DownloadButton variant="outlined" loading={loading} text={'Download...'}>
                  {' '}
                </DownloadButton>
              )
            }
          </PDFDownloadLink>
        )}
      </Paper>
      <Box className="flex flex-col sm:flex-row gap-4">
        <Paper sx={{ flex: 2, padding: '1rem' }}>
          <Box className="flex flex-col gap-3">
            <Typography variant="h4" className="font-extrabold flex justify-center items-center mb-4">
              STAJ DEĞERLENDİRME ANKET FORMU
            </Typography>
          </Box>

          <Box className=" gap-2 flex flex-col">
            <Box className="flex flex-col items-start justify-between">
              <Typography className="font-extrabold">Staj Yapılan Firma Adı</Typography>
              <Typography> {data?.data.company_name} </Typography>
            </Box>

            <Box className="flex flex-col items-start justify-between">
              <Typography className="font-extrabold">Staj Yapılan Firma Adresi</Typography>
              <Typography>{data?.data.company_address}</Typography>
            </Box>

            <Box className="flex flex-col items-start justify-between">
              <Typography className="font-extrabold">Öğretim Türü</Typography>
              <Typography>{data?.data.teach_type}</Typography>
            </Box>

            <Box className="flex flex-col items-start justify-between">
              <Typography className="font-extrabold">GANO</Typography>
              <Typography>{data?.data.gano}</Typography>
            </Box>

            <Box className="flex flex-col items-start justify-between">
              <Typography className="font-extrabold">Staj Grubu</Typography>
              <Typography>{data?.data.intern_group}</Typography>
            </Box>

            <Box className="flex flex-col items-start justify-between">
              <Typography className="font-extrabold">Staj Türü</Typography>
              <Typography>{data?.data.intern_type}</Typography>
            </Box>
          </Box>

          <Box className="flex items-center  justify-between flex-col py-4">
            <Typography variant="h4" className="font-extrabold text-red-400 mb-4">
              Anket Soruları
            </Typography>
            <Box className="flex flex-col gap-2">
              {mixedSingleQuestions?.map((item, index) => (
                <Box>
                  <Typography className="font-semibold">
                    {' '}
                    {index + 1}: {item.question}{' '}
                  </Typography>
                  <Typography className=""> -{item.answer} </Typography>
                </Box>
              ))}
              <Typography variant="h5" className="font-extrabold text-red-400 mb-4">
                Çok Cevaplı Soruları
              </Typography>

              {mixedMultiQuestions?.map((item, index) => (
                <Box>
                  <Typography className="font-semibold">
                    {' '}
                    {index + 1}: {item.question}{' '}
                  </Typography>
                  <Box className="flex gap-2 flex-col">
                    {item?.answer?.map((item) => (
                      <Typography className=""> -{item} </Typography>
                    ))}
                  </Box>
                </Box>
              ))}
              {mixedIntermQuestions?.length > 0 && (
                <Typography variant="h5" className="font-extrabold text-red-400 mb-4">
                  Dönem İçi Staj Yapanlar için Sorular
                </Typography>
              )}

              {mixedIntermQuestions?.map((item, index) => (
                <Box>
                  <Typography className="font-semibold">
                    {' '}
                    {index + 1}: {item.question}{' '}
                  </Typography>
                  <Typography className=""> -{item.answer} </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Paper>
        <Paper sx={{ flex: 1, padding: '1rem' }}>
          {data?.data?.isSealed && <SealedRecordAlert />}
          <RecordTraceCard record={data?.data} />
        </Paper>
      </Box>
    </div>
  );
};

export default SurveyDetail;
