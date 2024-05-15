import { Box, Button, CircularProgress, Paper, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useGetSurveyQuery } from 'src/store/services/survey/surveyApiSlice';
import moment from 'moment';
import { dataInterm, dataMulti, dataSingle } from '../SurveyComponents/SurveyQs';
import { useDispatch, useSelector } from 'react-redux';
import { setSurvey } from 'src/store/services/survey/surveySlice';
import { PDFDownloadLink } from '@react-pdf/renderer';
import DownloadButton from 'src/components/inputs/DownloadButton';
import UpdateButton from 'src/components/inputs/UpdateButton';
import PdfSurvey from 'src/PDF/survey/PdfSurvey';

const SurveyDetail = () => {
  const { surveyId } = useParams();
  const { data, isLoading, isSuccess, isError, error, refetch, currentData } = useGetSurveyQuery(surveyId);

  const [mixedSingleQuestions, setMixedSingleQuestions] = useState();
  const [mixedMultiQuestions, setMixedMultiQuestions] = useState();
  const [mixedIntermQuestions, setIntermMultiQuestions] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

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
      const response = await deleteForm(internFormId).unwrap();
    } catch (error) {
      console.log('error', error);
    }
    navigate('/intern-form');
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
        <UpdateButton loading={isLoading} variant="outlined" onClick={() => navigate('/survey/update/' + surveyId)}>
          Güncelle
        </UpdateButton>
        {data && (
          <PDFDownloadLink fileName="FORM" document={<PdfSurvey data={data} />}>
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
            <Typography
              style={{ fontFamily: 'Times New Roman' }}
              className="font-extrabold flex justify-center text-2xl items-center"
            >
              STAJ DEĞERLENDİRME ANKET FORMU
            </Typography>
            <Typography className="my-2">
              Sevgili Öğrenciler, Bu anketin amacı eğitimin niteliğini sürekli ve sistemli bir biçimde geliştirmek için
              görüşlerinizden yararlanmaktır. Yaptığınız stajı aşağıdaki ölçütlere göre değerlendirmeniz istenmektedir.
              Değerlendirmenizin kendi kişisel gözlem ve algılarınıza dayanıyor olması bu verilerin geçerliliği ve
              güvenilirliği açısından çok önemlidir. Buradaki sorulara verdiğiniz cevaplar stajınızın değerlendirilmesi
              esnasında dikkate alınmayacaktır. Bu nedenle değerlendirmeniz esnasında lütfen duygusal olmayınız ve
              arkadaşlarınızla aranızda fikir alışverişinde bulunmayınız.
            </Typography>
          </Box>

          <Box className=" w-full gap-2 flex flex-col ">
            <Box className="flex items-center justify-between">
              <Typography className="font-extrabold">Staj Yapılan Firma Adı: </Typography>
              <Typography> {data?.data.company_name} </Typography>
            </Box>

            <Box className="flex items-center  justify-between">
              <Typography className="font-extrabold">Staj Yapılan Firma Adresi:</Typography>
              <Typography>{data?.data.company_address}</Typography>
            </Box>

            <Box className="flex items-center  justify-between">
              <Typography className="font-extrabold">Öğretim Türü:</Typography>
              <Typography>{data?.data.teach_type}</Typography>
            </Box>
            <Box className="flex items-center  justify-between">
              <Typography className="font-extrabold">GANO:</Typography>
              <Typography>{data?.data.gano}</Typography>
            </Box>
          </Box>

          <Box className="flex items-center  justify-between flex-col py-4">
            <Typography className="font-extrabold text-red-400">Anket Soruları</Typography>
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
              <Typography className="font-extrabold text-red-400">Çok Cevaplı Soruları</Typography>

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
                <Typography className="font-extrabold text-red-400">Dönem İçi Staj Yapanlar için Sorular</Typography>
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
          <Stack spacing={2}>
            <Box className="flex flex-col gap-2">
              <Typography variant="h5">Kayıt Oluşturulma Tarihi</Typography>
              <Typography>{moment(data?.createdAt).format('DD.MM.YYYY HH:mm:ss')}</Typography>
            </Box>
            <Box className="flex flex-col gap-2">
              <Typography variant="h5">Kaydı oluşturan kişi</Typography>
              <Typography>{data?.createdBy?.name + ' ' + data?.createdBy?.last_name}</Typography>
            </Box>

            <Box className="flex flex-col gap-2">
              <Typography variant="h5">Son Güncelleme Tarihi</Typography>
              <Typography>{moment(data?.updatedAt).format('DD.MM.YYYY HH:mm:ss')}</Typography>
            </Box>
            <Box className="flex flex-col gap-2">
              <Typography variant="h5">Son Güncelleyen kişi</Typography>
              <Typography>{data?.updatedBy?.name + ' ' + data?.updatedBy?.last_name}</Typography>
            </Box>
          </Stack>
        </Paper>
      </Box>
    </div>
  );
};

export default SurveyDetail;
