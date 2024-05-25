import { Box, CircularProgress, Container, Paper, Typography } from '@mui/material';
import { PDFDownloadLink, PDFViewer, pdf } from '@react-pdf/renderer';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import PdfInternform from 'src/PDF/internform/PdfInternform';
import { UserRolesEnum } from 'src/app/enums/roleList';
import { permissionControll } from 'src/app/permissions/permissionController';
import SealedRecordAlert from 'src/components/details/SealedRecordAlert';
import CustomDetailPageBox from 'src/components/inputs/CustomDetailPageBox';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadButton from 'src/components/inputs/DownloadButton';
import UpdateButton from 'src/components/inputs/UpdateButton';
import RecordTraceCard from 'src/components/recordTraceCard/RecordTraceCard';
import {
  useDeleteFormMutation,
  useGetFormDetailQuery,
  useUnlockFormMutation,
} from 'src/store/services/internForm/internFormApiSlice';
import { setInternFormData } from 'src/store/services/internForm/internFormSlice';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import { saveAs } from 'file-saver';

import dayjs from 'dayjs';
import CustomIconButton from 'src/components/inputs/CustomIconButton';
import DialogButton from 'src/components/inputs/DialogButton';
import NavigateLink from 'src/components/details/NavigateLink';
import WorkOnSaturdayAlert from 'src/components/details/WorkOnSaturdayAlert';

function InternFormDetail() {
  const dispatch = useDispatch();

  const { internFormId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [loadingDownload, setLoadingDownload] = useState(true);

  const { data, isLoading, isSuccess, isError, error, refetch } = useGetFormDetailQuery(internFormId);
  const [deleteForm, { isLoading: isLoadingDeleteForm }] = useDeleteFormMutation();

  const [unlockForm, { isLoading: isLoadingUnlockForm }] = useUnlockFormMutation();

  const userRole = useSelector((state) => state.auth.roles);
  const studentPermission = permissionControll(userRole, UserRolesEnum.COMISSION.id);

  let internFormData = {};

  useEffect(() => {
    if (error) {
      //TODO:  error snackbar
      navigate('/intern-form');
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess && data.data) {
      dispatch(setInternFormData(data?.data));
    }
  }, [isSuccess]);

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

  const handleUnlock = async () => {
    try {
      const response = await unlockForm(internFormId).unwrap();
    } catch (error) {
      console.log('error', error);
    }
    refetch();
  };

  console.log('data', data);
  if (isLoading) {
    return <CircularProgress />;
  }

  if (isSuccess) {
    internFormData = data.data;

    const accordionData = [
      [
        { header: 'Form Bilgileri' },
        { text: 'Fakülte Adı', value: data?.data?.edu_faculty },
        { text: 'Bölüm Adı ', value: data?.data?.edu_program },
        { text: 'Eğitim Yılı', value: data?.data?.edu_year?.name },
        { text: 'Staj Başlangıç Tarihi', value: dayjs(data?.data?.start_date).format('DD.MM.YYYY') },
        { text: 'Staj Bitiş Tarihi', value: dayjs(data?.data?.end_date).format('DD.MM.YYYY') },
        { text: 'Staj Dönemi', value: data?.data?.isInTerm ? 'Dönem İçi' : 'Dönem Dışı' },
        { text: 'Staj Gün Sayısı', value: data?.data?.total_work_day },
        {
          text: 'Çalışma Günleri',
          value: ['Pazartesi ', 'Salı ', 'Çarşamba ', 'Perşembe ', 'Cuma ', 'Cumartesi '].map((item, index) =>
            data?.data.weekDayWork.includes(index + 1) ? item : '',
          ),
        },
        {
          text: 'Cumartesi Çalışır',
          value: data?.data?.workOnSaturday ? 'Evet' : 'Hayır',
        },
      ],
      [
        { header: 'Staj Sorumlusu' },
        { text: 'Adı', value: data?.data?.follow_up?.name },
        { text: 'Soyadı', value: data?.data?.follow_up?.last_name },
      ],
      [
        { header: 'Öğrenci Bilgileri' },
        { text: 'Adı', value: data?.data?.student?.name },
        { text: 'Soyadı', value: data?.data?.student?.last_name },
        { text: 'Okul Numarası', value: data?.data?.student?.school_number },
        { text: 'Tc Kimlik No', value: data?.data?.student?.tc_number },
        { text: 'Adresi', value: data?.data?.student_info?.address },
        { text: 'Doğum Tarihi', value: dayjs(data?.data?.student_info?.birth_date).format('DD.MM.YYYY') },
        { text: 'Doğum Yeri', value: data?.data?.student_info?.birth_place },
        { text: 'Baba Adı', value: data?.data?.student_info?.fathers_name },
        { text: 'Anne Adı', value: data?.data?.student_info?.mothers_name },
      ],
      [
        { header: 'Şirket Bilgileri' },
        { text: 'Adı', value: data?.data?.company_info?.name },
        { text: 'Adresi', value: data?.data?.company_info?.address },
        { text: 'Telefon No', value: data?.data?.company_info?.phone },
        { text: 'Fax No', value: data?.data?.company_info?.fax },
        { text: 'E-Posta Adresi', value: data?.data?.company_info?.email },
        { text: 'Hizmet Alanı', value: data?.data?.company_info?.service_area },
      ],
    ];
    const submitForm = async (event) => {
      event.preventDefault(); // prevent page reload
      setLoadingDownload(false);
      const blob = await pdf(<PdfInternform data={data.data} />).toBlob();
      saveAs(blob, 'uludag.pdf');
      setLoadingDownload(true);
    };
    return (
      <div>
        <Typography variant="h2">Staj Formu</Typography>
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
          {studentPermission && (
            <DialogButton
              className="px-4 flex"
              onSubmit={handleDelete}
              buttonColor="error"
              Icon={<DeleteIcon />}
              variant="outlined"
              disabled={isLoadingDeleteForm}
              loading={isLoadingDeleteForm}
              button="Sil"
              message="Bu kayıt silindikten sonra (varsa) ilişkili kayıtlar silinir."
              subContent={
                <ul>
                  <li>1.Staj Durumu</li>
                  <li>2.Mülakat</li>
                  <li>3.Öğrenci Değerlendirme Anketi</li>
                  <li>4.Gizli Sicil Fişi</li>
                </ul>
              }
            />
          )}

          <UpdateButton
            onClick={() => navigate('/intern-form/update/' + internFormId)}
            disabled={(internFormData?.isSealed && !studentPermission) || isLoading}
            variant="outlined"
            loading={isLoading}
          />
          {studentPermission && (
            <CustomIconButton
              onClick={handleUnlock}
              color={'warning'}
              loading={isLoadingUnlockForm}
              disabled={isLoadingUnlockForm}
              Icon={internFormData?.isSealed ? <LockOpenIcon /> : <LockIcon />}
              text={internFormData?.isSealed ? 'Mührü aç' : 'Mühürle'}
            />
          )}
          {data?.data && (
            <DownloadButton loadingDownload={loadingDownload} submitForm={submitForm} variant="outlined" />
          )}
        </Paper>
        <Box className="flex flex-col sm:flex-row gap-4">
          <Paper sx={{ flex: 2 }}>
            <Container>
              <NavigateLink text={'İlgili Staj Durumu'} linkId={data?.data?.internStatus?.id} route={'intern-status'} />
            </Container>
            <CustomDetailPageBox data={accordionData} />
          </Paper>
          <Box className="flex flex-1 flex-col">
            {internFormData.workOnSaturday && <WorkOnSaturdayAlert />}
            {internFormData?.isSealed && <SealedRecordAlert />}
            <RecordTraceCard record={internFormData} />
          </Box>
        </Box>
        <Box className="flex flex-col sm:flex-row gap-4"></Box>
      </div>
    );
  }

  return null;
}

export default InternFormDetail;
