import { Box, Button, Container, Paper, Stack, Typography } from '@mui/material';
import { PDFDownloadLink } from '@react-pdf/renderer';
import dayjs from 'dayjs';
import { enqueueSnackbar } from 'notistack';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import PdfConfidentalReport from 'src/PDF/confidentalReport/PdfConfidentalReport';
import { UserRolesEnum } from 'src/app/enums/roleList';
import NavigateLink from 'src/components/details/NavigateLink';
import DialogButton from 'src/components/inputs/DialogButton';
import DownloadButton from 'src/components/inputs/DownloadButton';
import UpdateButton from 'src/components/inputs/UpdateButton';
import RecordTraceCard from 'src/components/recordTraceCard/RecordTraceCard';
import usePermission from 'src/hooks/usePermission';
import {
  useDeleteConfidentalReportMutation,
  useGetConfidentalReportQuery,
} from 'src/store/services/confidentalReport/confidentalReportApiSlice';
import { setConfidentalReport } from 'src/store/services/confidentalReport/confidentalReportSlice';

const ConfidentalReportDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const checkPermission = usePermission();

  const isAdvancedComission = checkPermission(UserRolesEnum.COMISSION.id);

  const { confidentalReportId } = useParams();
  const { data, isLoading, isSuccess, isError, error, refetch, currentData } =
    useGetConfidentalReportQuery(confidentalReportId);
  const [deleteConfidentalReport, { isLoading: isLoadingDelete }] = useDeleteConfidentalReportMutation();

  useEffect(() => {
    refetch();
  }, [location, navigate]);

  useEffect(() => {
    if (data?.data) {
      dispatch(setConfidentalReport(data.data));
    }
  }, [isSuccess]);

  const handleDelete = async () => {
    try {
      const response = await deleteConfidentalReport(confidentalReportId).unwrap();
    } catch (error) {}
    navigate('/confidental-report');
  };

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
          <DialogButton
            className="px-4 flex"
            onSubmit={handleDelete}
            buttonColor="error"
            Icon={<DeleteIcon />}
            variant="outlined"
            disabled={isLoadingDelete}
            loading={isLoadingDelete}
            button="Sil"
            message="Bu kayıt silindikten sonra (varsa) ilişkili kayıtlar silinir."
            subContent={
              <ul>
                <li>1.Mülakat</li>
              </ul>
            }
          />
        )}
        <UpdateButton
          loading={isLoading}
          variant="outlined"
          onClick={() => navigate('/confidental-report/update/' + confidentalReportId)}
        />
        {data && (
          <PDFDownloadLink fileName="FORM" document={<PdfConfidentalReport data={data.data} />}>
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
            <NavigateLink text={'İlgili Mülakat'} linkId={data?.data?.interview?.id} route={'interview'} />
            <Container>
              <Typography variant="h5" className="text-red-400">
                Öğrencinin Kimlik Bilgileri:
              </Typography>

              <Box className="flex items-center justify-between">
                <Typography className="font-extrabold">Adı - Soyadı: </Typography>
                <Typography>
                  {data?.data?.interview?.student?.name + ' ' + data?.data?.interview?.student?.last_name}{' '}
                </Typography>
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
              <Typography variant="h5" className="text-red-400">
                Staj Tarihi ve Çalışma Konuları
              </Typography>
              <Box className="flex items-center  justify-between">
                <Typography className="font-extrabold">Staj Başlama Tarihi:</Typography>
                <Typography>{dayjs(data?.data.start_date).format('DD.MM.YYYY')}</Typography>
              </Box>
              <Box className="flex items-center  justify-between">
                <Typography className="font-extrabold">Staj Bitiş Tarihi :</Typography>
                <Typography>{dayjs(data?.data.end_date).format('DD.MM.YYYY')}</Typography>
              </Box>
              <Box className="flex items-center  justify-between">
                <Typography className="font-extrabold">Öğrencinin Devamsızlık Günleri:</Typography>
                <Typography>{data?.data.days_of_absence}</Typography>
              </Box>
              <Box className="flex items-center  justify-between">
                <Typography className="font-extrabold">Staj Yapılan Departman:</Typography>
                <Typography>{data?.data.department}</Typography>
              </Box>
              <Box className="flex items-center  justify-between">
                <Typography className="font-extrabold">Staj İçerisinde Eğitim Programı Uygulandı mı?</Typography>
                <Typography>{data?.data.is_edu_program ? 'Evet' : 'Hayır'}</Typography>
              </Box>
            </Container>
            <Container>
              <Typography variant="h5" className="text-red-400">
                Staj Çalışma Değerlendirmesi
              </Typography>
              <Box className="flex items-center  justify-between">
                <Typography className="font-extrabold">Çalışmada Dikkat ve Sorumluluk:</Typography>
                <Typography>{data?.data.intern_evaluation?.responsibility}</Typography>
              </Box>
              <Box className="flex items-center  justify-between">
                <Typography className="font-extrabold">İşi Yapmadakı Başarısı:</Typography>
                <Typography>{data?.data.intern_evaluation?.success}</Typography>
              </Box>
              <Box className="flex items-center  justify-between">
                <Typography className="font-extrabold">Üstlerine Karşı Davranış:</Typography>
                <Typography>{data?.data.intern_evaluation?.behaviour_to_auths}</Typography>
              </Box>
              <Box className="flex items-center  justify-between">
                <Typography className="font-extrabold">Çalışma Arkadaşlarına Karşı Davranışı:</Typography>
                <Typography>{data?.data.intern_evaluation?.behaviour_to_coworkers}</Typography>
              </Box>
              <Box className="flex items-center  justify-between">
                <Typography className="font-extrabold">İş Güvenliği Kurallarına Uyumu: </Typography>
                <Typography> {data?.data.intern_evaluation?.work_safety}</Typography>
              </Box>
              <Box className="flex items-center  justify-between">
                <Typography className="font-extrabold">Meslek Bilgi Düzeyi:</Typography>
                <Typography>{data?.data.intern_evaluation?.competence}</Typography>
              </Box>
              <Box className="flex items-center  justify-between">
                <Typography className="font-extrabold">Puanlama:</Typography>
                <Typography> {data?.data.intern_evaluation?.score}</Typography>
              </Box>
            </Container>
            <Container>
              <Typography variant="h5" className="text-red-400">
                Değerlendirmeyi Yapan Yetkilinin (Mühendis)
              </Typography>
              <Box className="flex items-center  justify-between">
                <Typography className="font-extrabold">Adı Soyadı:</Typography>
                <Typography>{data?.data.auth_name}</Typography>
              </Box>
              <Box className="flex items-center  justify-between">
                <Typography className="font-extrabold">Diploma Ünvanı:</Typography>
                <Typography>{data?.data.auth_position}</Typography>
              </Box>
              <Box className="flex items-center  justify-between">
                <Typography className="font-extrabold">Sicil No (isteğe bağlı):</Typography>
                <Typography>{data?.data.reg_number}</Typography>
              </Box>
              <Box className="flex items-center  justify-between">
                <Typography className="font-extrabold">TC Kimlik No:</Typography>
                <Typography>{data?.data.auth_tc_number}</Typography>
              </Box>
              <Box className="flex items-center  justify-between">
                <Typography className="font-extrabold">Tarih: </Typography>
                <Typography>{dayjs(data?.data?.createdAt).format('DD.MM.YYYY')}</Typography>
              </Box>
            </Container>
          </Box>
        </Paper>
        <Box sx={{ flex: 1 }}>
          <RecordTraceCard record={data?.data} />
        </Box>
      </Box>
    </div>
  );
};

export default ConfidentalReportDetail;
