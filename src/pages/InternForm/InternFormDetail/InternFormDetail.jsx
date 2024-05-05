import { Alert, AlertTitle, Box, Button, CircularProgress, Paper, Stack, Typography } from '@mui/material';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import moment from 'moment';
import React, { useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import PdfInternform from 'src/PDF/internform/PdfInternform';
import { UserRolesEnum } from 'src/app/enums/roleList';
import { permissionControll } from 'src/app/permissions/permissionController';
import SealedRecordAlert from 'src/components/details/SealedRecordAlert';
import CustomDetailPageBox from 'src/components/inputs/CustomDetailPageBox';
import DeleteButton from 'src/components/inputs/DeleteButton';
import DownloadButton from 'src/components/inputs/DownloadButton';
import UpdateButton from 'src/components/inputs/UpdateButton';
import RecordTraceCard from 'src/components/recordTraceCard/RecordTraceCard';
import { useDeleteFormMutation, useGetFormDetailQuery } from 'src/store/services/internForm/internFormApiSlice';
import { setInternFormData } from 'src/store/services/internForm/internFormSlice';

function InternFormDetail() {
  const dispatch = useDispatch();

  const { internFormId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { data, isLoading, isSuccess, isError, error, refetch } = useGetFormDetailQuery(internFormId);
  console.log(data);
  const [
    deleteForm,
    {
      isLoading: isLoadingDeleteForm,
      isSuccess: isSuccesDeleteForm,
      isError: isErrorDeleteForm,
      error: errorDeleteForm,
    },
  ] = useDeleteFormMutation();

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

  console.log('data', data);
  if (isLoading) {
    return <CircularProgress />;
  }

  if (isSuccess) {
    internFormData = data.data;

    const accordionData = [
      [
        { text: 'Fakülte Adı: ', value: data?.data.edu_faculty },
        { text: 'Bölüm Adı: ', value: data?.data.edu_program },
        { text: 'Eğitim Yılı: ', value: data?.data.edu_year.name },
        { text: 'Staj Başlangıcı: ', value: data?.data.start_date },
        { text: 'Staj Bitiş: ', value: data?.data.end_date },
        { text: 'Staj Dönemi: ', value: data?.data.isInterm ? 'Dönem İçi' : 'Dönem Dışı' },
        { text: 'Staj Staj Gün Sayısı: ', value: data?.data.total_work_day },
        {
          text: 'Çalışma Günleri: ',
          value: ['Pazartesi ', 'Salı ', 'Çarşamba ', 'Perşembe ', 'Cuma ', 'Cumartesi '].map((item, index) =>
            data?.data.weekDayWork.includes(index + 1) ? item : '',
          ),
        },
      ],
      [
        { text: 'Staj Sorumlu Adı: ', value: data?.data.follow_up.name },
        { text: 'Staj Sorumlu Soyadı: ', value: data?.data.follow_up.last_name },
      ],
      [
        { text: 'Öğrenci Adı: ', value: data?.data.student.name },
        { text: 'Öğrenci Soyadı: ', value: data?.data.student.last_name },
        { text: 'Okul Numarası: ', value: data?.data.student.school_number },
        { text: 'Tc Kimlik No: ', value: data?.data.student.tc_number },
        { text: 'Adresi: ', value: data?.data.student_info.address },
        { text: 'Doğum Tarihi: ', value: data?.data.student_info.birth_date },
        { text: 'Doğum Yeri: ', value: data?.data.student_info.birth_place },
        { text: 'Baba: Adı', value: data?.data.student_info.fathers_name },
        { text: 'Anne Adı: ', value: data?.data.student_info.mothers_name },
      ],
    ];

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
            <DeleteButton
              onClick={handleDelete}
              variant="outlined"
              loading={isLoadingDeleteForm}
              disabled={isLoadingDeleteForm}
            />
          )}

          <UpdateButton
            onClick={() => navigate('/intern-form/update/' + internFormId)}
            disabled={(internFormData?.isSealed && !studentPermission) || isLoading}
            variant="outlined"
            loading={isLoading}
          />
          {data && (
            <PDFDownloadLink fileName="FORM" document={<PdfInternform data={data.data} />}>
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
          <Paper sx={{ flex: 2 }}>
            <CustomDetailPageBox data={accordionData} />
          </Paper>
          <Box className="flex flex-1 flex-col">
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
