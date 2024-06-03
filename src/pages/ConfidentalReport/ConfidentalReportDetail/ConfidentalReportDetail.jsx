import { Box, Container, Paper, Stack, Typography } from '@mui/material';
import { PDFDownloadLink, PDFViewer, pdf } from '@react-pdf/renderer';
import dayjs from 'dayjs';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { saveAs } from 'file-saver';
import CustomDetailPageBox from 'src/components/inputs/CustomDetailPageBox';
import { projectSnackbar } from 'src/app/handlers/ProjectSnackbar';

const ConfidentalReportDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const checkPermission = usePermission();

  const isAdvancedComission = checkPermission(UserRolesEnum.COMISSION.id);
  const [loadingDownload, setLoadingDownload] = useState(true);
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
      const response = await deleteConfidentalReport(confidentalReportId);

      if (response.data) {
        projectSnackbar(response.data.message, { variant: 'success' });
      }
    } catch (error) {
      console.log(error);
    }
    navigate('/confidental-report');
  };
  const submitForm = async (event) => {
    event.preventDefault(); // prevent page reload
    setLoadingDownload(false);
    const blob = await pdf(<PdfConfidentalReport data={data.data} />).toBlob();
    saveAs(blob, 'wycena.pdf');
    setLoadingDownload(true);
  };
  console.log(data);
  const accordionData = [
    [
      { header: 'Öğrenci Kimlik Bilgileri' },
      {
        text: 'Adı - Soyadı',
        value: data?.data?.interview?.student?.name + ' ' + data?.data?.interview?.student?.last_name,
      },
      {
        text: 'Doğum Yeri / Tarihi ',
        value:
          data?.data?.interview?.intern_status?.form?.student_info?.birth_place +
          ' ' +
          dayjs(data?.data?.interview?.intern_status?.form?.student_info.birth_date).format('DD.MM.YYYY'),
      },
      { text: 'Tc Kimlik', value: data?.data?.interview.student.tc_number },
      { text: 'Bölümü', value: 'Bilgisayar Mühendisliği' },
      { text: 'Okul No', value: data?.data?.interview.student.school_number },
    ],
    [
      { header: 'Staj Tarihi ve Çalışma Konuları' },
      { text: 'Staj Başlama Tarihi', value: dayjs(data?.data?.start_date).format('DD.MM.YYYY') },
      { text: 'Staj Bitiş Tarihi', value: dayjs(data?.data?.end_date).format('DD.MM.YYYY') },
      {
        text: 'Öğrenci Devamsızlık Gün Sayısı',
        value: data?.data?.days_of_absence,
      },
      { text: 'Staj Yapılan Departman', value: data?.data?.department },
      { text: 'Staj İçerisinde Eğitim Programı Uygulandı mı ?', value: data?.data?.is_edu_program ? 'Evet' : 'Hayır' },
    ],
    [
      { header: 'Staj Çalışma Değerlendirme' },
      { text: 'Çalışmada Dikkat ve Sorumluluk', value: data?.data?.intern_evaluation?.responsibility },
      { text: 'İş Yapmadaki Başarısı', value: data?.data?.intern_evaluation?.success },
      { text: 'Öğrenme ve Araştırma İlgisi', value: data?.data?.intern_evaluation?.interest },
      { text: 'Üstlerine Karşı Davranışı', value: data?.data?.intern_evaluation?.behaviour_to_auths },
      { text: 'Çalışma Arkadaşlarına Karşı Davranışı', value: data?.data?.intern_evaluation?.behaviour_to_coworkers },
      { text: 'İş Güvenliği Kurallarına Uyumu', value: data?.data?.intern_evaluation?.work_safety },
      { text: 'Meslek Bilgi Düzeyi', value: data?.data?.intern_evaluation?.competence },
      { text: 'Puanlama', value: data?.data?.intern_evaluation?.score },
    ],
    [
      { header: 'Değerlendirmeyi Yapan Yetkilinin (mühendis)' },
      { text: 'Adı - Soyadı', value: data?.data?.auth_name },
      { text: 'Diploma Ünvanı', value: data?.data?.auth_position },
      { text: 'Sicil No', value: data?.data?.reg_number },
      { text: 'Tc Kimlik No', value: data?.data?.auth_tc_number },
      { text: 'Tarih', value: '26/05/2024' },
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
        {data?.data && <DownloadButton loadingDownload={loadingDownload} submitForm={submitForm} variant="outlined" />}
      </Paper>
      <Box className="flex flex-col sm:flex-row gap-4">
        <Paper sx={{ flex: 2, padding: '1rem' }}>
          <Box className=" w-full gap-2 flex flex-col ">
            <Container>
              <NavigateLink text={'İlgili Mülakat'} linkId={data?.data?.interview?.id} route={'interview'} />
            </Container>
            <CustomDetailPageBox data={accordionData} />
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
