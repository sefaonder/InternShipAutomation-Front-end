import { Box, Button, Container, Paper, Stack, Typography } from '@mui/material';
import { PDFDownloadLink } from '@react-pdf/renderer';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import PdfConfidentalReport from 'src/PDF/confidentalReport/PdfConfidentalReport';
import DownloadButton from 'src/components/inputs/DownloadButton';
import UpdateButton from 'src/components/inputs/UpdateButton';
import { useGetConfidentalReportQuery } from 'src/store/services/confidentalReport/confidentalReportApiSlice';
import { setConfidentalReport } from 'src/store/services/confidentalReport/confidentalReportSlice';

const ConfidentalReportDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { confidentalReportId } = useParams();
  const { data, isLoading, isSuccess, isError, error } = useGetConfidentalReportQuery(confidentalReportId);

  useEffect(() => {
    if (data) {
      dispatch(setConfidentalReport(data));
    }
  }, [data]);

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
        <UpdateButton
          loading={isLoading}
          variant="outlined"
          onClick={() => navigate('/confidental-report/update/' + confidentalReportId)}
        >
          Güncelle
        </UpdateButton>
        {data && (
          <PDFDownloadLink fileName="FORM" document={<PdfConfidentalReport data={data} />}>
            {({ loading }) =>
              loading ? (
                <DownloadButton variant="outlined" loading={loading} text={'Loading...'}></DownloadButton>
              ) : (
                <DownloadButton variant="outlined" loading={loading} text={'Download...'}></DownloadButton>
              )
            }
          </PDFDownloadLink>
        )}
      </Paper>
      <Box className="flex flex-col sm:flex-row gap-4">
        <Paper sx={{ flex: 2, padding: '1rem' }}>
          <Box className=" w-full gap-2 flex flex-col ">
            <Container>
              <Typography className="text-red-400">Öğrencinin Kimlik Bilgileri:</Typography>

              <Box className="flex items-center justify-between">
                <Typography className="font-extrabold">Adı - Soyadı: </Typography>
                <Typography> Murat ilhan </Typography>
              </Box>

              <Box className="flex items-center  justify-between">
                <Typography className="font-extrabold">Doğum Yeri / Tarihi:</Typography>
                <Typography>Artvin</Typography>
              </Box>

              <Box className="flex items-center  justify-between">
                <Typography className="font-extrabold">TC Kimlik No:</Typography>
                <Typography>123 123 123 12</Typography>
              </Box>
              <Box className="flex items-center  justify-between">
                <Typography className="font-extrabold">Bölümü:</Typography>
                <Typography>B. mühendisliği</Typography>
              </Box>
              <Box className="flex items-center  justify-between">
                <Typography className="font-extrabold">Okul No:</Typography>
                <Typography>123 123 123 12</Typography>
              </Box>
            </Container>
            <Container>
              <Typography className="text-red-400">Staj Tarihi ve Çalışma Konuları:</Typography>
              <Box className="flex items-center  justify-between">
                <Typography className="font-extrabold">Staj Başlama Tarihi:</Typography>
                <Typography>{data?.start_date}</Typography>
              </Box>
              <Box className="flex items-center  justify-between">
                <Typography className="font-extrabold">Staj Bitiş Tarihi :</Typography>
                <Typography>{data?.end_date}</Typography>
              </Box>
              <Box className="flex items-center  justify-between">
                <Typography className="font-extrabold">Öğrencinin Devamsızlık Günleri:</Typography>
                <Typography>{data?.days_of_absence}</Typography>
              </Box>
              <Box className="flex items-center  justify-between">
                <Typography className="font-extrabold">Staj Yapılan Departman:</Typography>
                <Typography>{data?.department}</Typography>
              </Box>
              <Box className="flex items-center  justify-between">
                <Typography className="font-extrabold">Staj İçerisinde Eğitim Programı Uygulandı mı?</Typography>
                <Typography>{data?.is_edu_program ? 'Evet' : 'Hayır'}</Typography>
              </Box>
            </Container>
            <Container>
              <Typography className="text-red-400">Staj Çalışma Değerlendirmesi:</Typography>
              <Box className="flex items-center  justify-between">
                <Typography className="font-extrabold">Çalışmada Dikkat ve Sorumluluk:</Typography>
                <Typography>{data?.intern_evaluation.responsibility}</Typography>
              </Box>
              <Box className="flex items-center  justify-between">
                <Typography className="font-extrabold">İşi Yapmadakı Başarısı:</Typography>
                <Typography>{data?.intern_evaluation.success}</Typography>
              </Box>
              <Box className="flex items-center  justify-between">
                <Typography className="font-extrabold">Üstlerine Karşı Davranış:</Typography>
                <Typography>{data?.intern_evaluation.behaviour_to_auths}</Typography>
              </Box>
              <Box className="flex items-center  justify-between">
                <Typography className="font-extrabold">Çalışma Arkadaşlarına Karşı Davranışı:</Typography>
                <Typography>{data?.intern_evaluation.behaviour_to_coworkers}</Typography>
              </Box>
              <Box className="flex items-center  justify-between">
                <Typography className="font-extrabold">İş Güvenliği Kurallarına Uyumu: </Typography>
                <Typography> {data?.intern_evaluation.work_safety}</Typography>
              </Box>
              <Box className="flex items-center  justify-between">
                <Typography className="font-extrabold">Meslek Bilgi Düzeyi:</Typography>
                <Typography>{data?.intern_evaluation.competence}</Typography>
              </Box>
              <Box className="flex items-center  justify-between">
                <Typography className="font-extrabold">Puanlama:</Typography>
                <Typography> {data?.intern_evaluation.score}</Typography>
              </Box>
            </Container>
            <Container>
              <Typography className="text-red-400">Değerlendirmeyi Yapan Yetkilinin (Mühendis):</Typography>
              <Box className="flex items-center  justify-between">
                <Typography className="font-extrabold">Adı Soyadı:</Typography>
                <Typography>{data?.auth_name}</Typography>
              </Box>
              <Box className="flex items-center  justify-between">
                <Typography className="font-extrabold">Diploma Ünvanı:</Typography>
                <Typography>{data?.auth_position}</Typography>
              </Box>
              <Box className="flex items-center  justify-between">
                <Typography className="font-extrabold">Sicil No (isteğe bağlı):</Typography>
                <Typography>{data?.reg_number}</Typography>
              </Box>
              <Box className="flex items-center  justify-between">
                <Typography className="font-extrabold">TC Kimlik No:</Typography>
                <Typography>{data?.auth_tc_number}</Typography>
              </Box>
              <Box className="flex items-center  justify-between">
                <Typography className="font-extrabold">Taril: </Typography>
                <Typography> 123 123 123</Typography>
              </Box>
            </Container>
          </Box>
        </Paper>
        <Paper sx={{ flex: 1, padding: '1rem' }}>
          <Stack spacing={2}>
            <Box className="flex flex-col gap-2">
              <Typography variant="h5">Kayıt Oluşturulma Tarihi</Typography>
              <Typography>{moment(data?.createdAt).format('DD.MM.YYYY HH:mm:ss')}</Typography>
            </Box>
            <Box className="flex flex-col gasp-2">
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

export default ConfidentalReportDetail;
