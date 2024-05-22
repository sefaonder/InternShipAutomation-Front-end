import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert, Box, Button, Collapse, Container, FormLabel, TextField, Tooltip, Typography } from '@mui/material';
import CustomAutocomplete from 'src/components/inputs/CustomAutocomplete';

import CustomDateInput from 'src/components/inputs/CustomDateInput';
import CustomRadioGroup from 'src/pages/Survey/SurveyComponents/CustomRadioGroup';
import dayjs from 'dayjs';
import {
  useCreateCompanyConfidentalReportMutation,
  useGetCompanyConfidentalReportQuery,
} from 'src/store/services/confidentalReport/confidentalReportApiSlice';
import { useGetInterviewACQuery } from 'src/app/api/autocompleteSlice';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PdfConfidentalReport from 'src/PDF/confidentalReport/PdfConfidentalReport';
import DownloadButton from 'src/components/inputs/DownloadButton';
import DialogButton from 'src/components/inputs/DialogButton';
import { enqueueSnackbar } from 'notistack';

function CompanyConfidentalReport() {
  const navigate = useNavigate();

  const { token } = useParams(); // URL'den token parametresini alıyoruz
  const { data, isLoading, isSuccess, isError, error, refetch } = useGetCompanyConfidentalReportQuery(token, {
    skip: !Boolean(token),
  });

  const isAlreadySubmitted = data?.data?.interview?.confidentalReport?.id;

  const [createCompanyConfidentalReport, { isLoading: isLoadingCreate }] = useCreateCompanyConfidentalReportMutation();

  // createCompanyConfidentalReport

  console.log('token', token);

  useEffect(() => {
    if (!token) {
      navigate('/notvalid');
    }
  }, [token]);

  useEffect(() => {
    if (isError) {
      navigate('/notvalid');
    }
  }, [error]);

  useEffect(() => {
    if (data?.data) {
      if (isAlreadySubmitted) {
        const confidentalInfo = data?.data?.interview?.confidentalReport;
        for (const key in confidentalInfo.intern_evaluation) {
          formik.setFieldValue(`${key}`, confidentalInfo.intern_evaluation[key], false);
        }
        formik.setFieldValue('company_name', confidentalInfo.company_name, false);
        formik.setFieldValue('address', confidentalInfo.address, false);
        formik.setFieldValue('start_date', confidentalInfo.start_date, false);
        formik.setFieldValue('end_date', confidentalInfo.end_date, false);
        formik.setFieldValue('days_of_absence', confidentalInfo.days_of_absence, false);
        formik.setFieldValue('department', confidentalInfo.department, false);
        formik.setFieldValue('is_edu_program', confidentalInfo.is_edu_program ? 'Evet' : 'Hayır', false);
        formik.setFieldValue('auth_name', confidentalInfo.auth_name, false);
        formik.setFieldValue('auth_position', confidentalInfo.auth_position, false);

        formik.setFieldValue('auth_tc_number', confidentalInfo.auth_tc_number, false);
        formik.setFieldValue('auth_title', confidentalInfo.auth_title, false);
        formik.setFieldValue('reg_number', confidentalInfo.reg_number, false);

        formik.setFieldValue('desc', confidentalInfo.desc, false);
        formik.setFieldValue('interview', { id: data.data.interview.id }, false);
      } else {
        formik.setFieldValue('company_name', data.data.form.company_info.name, false);
        formik.setFieldValue('address', data.data.form.company_info.address, false);
        formik.setFieldValue('start_date', data.data.form.start_date, false);
        formik.setFieldValue('end_date', data.data.form.end_date, false);
        formik.setFieldValue('interview', { id: data.data.interview.id }, false);
      }
    }
  }, [data, isSuccess]);

  const is_edu_program = {
    name: 'Staj İçerisinde Eğitim Programı Uygulandı mı?',
    type: 'is_edu_program',
    data: ['Evet', 'Hayır'],
  };
  const internship_evulation = [
    { name: 'Çalışmada Dikkat ve Sorumluluk', type: 'responsibility', data: ['İyi', 'Orta', 'Iyi Degil'] },
    { name: 'İşi Yapmadaki Başarısı', type: 'success', data: ['Iyi', 'Orta', 'Iyi Degil'] },
    { name: 'Öğrenme ve Araştırma İlgisi', type: 'interest', data: ['Iyi', 'Orta', 'İyi Değil'] },
    { name: 'Üstelerine Karşı Davranışı', type: 'behaviour_to_auths', data: ['Iyi', 'Orta', 'Iyi Degil'] },
    { name: 'Çalışma Arkadaşlarına Davranışı', type: 'behaviour_to_coworkers', data: ['Iyi', 'Orta', 'Iyi Degil'] },
    { name: 'İş Güvenliği Kurallarına Uyumu', type: 'work_safety', data: ['Iyi', 'Orta', 'Iyi Degil'] },
    { name: 'Meslek Bilgi Düzeyi', type: 'competence', data: ['Iyi', 'Orta', 'Iyi Degil'] },
  ];

  const validationSchema = yup.object({
    interview: yup.object().shape({
      id: yup.string().required('Lütfen İlgili Mülakatı seçin'),
    }),
    desc: yup.string().optional('Bu alan'),
    company_name: yup.string().required('Bu Alan'),
    address: yup.string().required('Bu Alan'),
    days_of_absence: yup.number().required('Bu Alan'),
    department: yup.string().required('Bu Alan'),
    is_edu_program: yup.string().required('Bu Alan'),
    responsibility: yup.string().required('Bu Alan'),
    success: yup.string().required('Bu Alan'),
    interest: yup.string().required('Bu Alan'),
    behaviour_to_auths: yup.string().required('Bu Alan'),
    behaviour_to_coworkers: yup.string().required('Bu Alan'),
    work_safety: yup.string().required('Bu Alan'),
    competence: yup.string().required('Bu Alan'),
    auth_name: yup.string().required('Bu Alan'),
    auth_position: yup.string().required('Bu Alan'),
    reg_number: yup.string().optional('Bu Alan'),
    auth_tc_number: yup.string().required('Bu Alan').min(11, 'En az 11 karakter').max(11, 'En fazla 11 karakter'),
    auth_title: yup.string().required('Bu Alan'),
    score: yup.number().required('Bu Alan').min(0, 'en az 0 puan olabilir').max(100, 'en fazla 100 puan olabilir'),
  });

  const initialValues = {
    interview: {},
    company_name: '',
    address: '',
    start_date: '',
    end_date: '',
    days_of_absence: null,
    department: '',
    is_edu_program: null,
    responsibility: '',
    success: '',
    interest: '',
    behaviour_to_auths: '',
    behaviour_to_coworkers: '',
    work_safety: '',
    competence: '',
    auth_position: '',
    auth_name: '',
    auth_tc_number: '',
    auth_title: '',
    score: '',
  };

  const handleSubmit = async (values) => {
    try {
      console.log('values', values);
      const {
        responsibility,
        success,
        interest,
        behaviour_to_auths,
        behaviour_to_coworkers,
        work_safety,
        competence,
        score,
        ...restValues
      } = values;

      if (token) {
        const response = await createCompanyConfidentalReport({
          ...restValues,
          confidentalReportToken: token,
          is_edu_program: restValues.is_edu_program === 'Evet' ? true : false,
          intern_evaluation: {
            responsibility,
            success,
            interest,
            behaviour_to_auths,
            behaviour_to_coworkers,
            work_safety,
            competence,
            score,
          },
        });

        enqueueSnackbar(response.data.message, { variant: 'success' });
        refetch();
      }
    } catch (error) {
      enqueueSnackbar(error, { variant: 'error' });
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
    enableReinitialize: true,
  });

  console.log('formik', formik.values);
  console.log('formikerrors', formik.errors);

  return (
    <div className="flex items-center justify-center border-2 relative bg-white rounded-xl">
      <img
        className="w-20 left-2/4 -translate-x-2/4 absolute top-[-40px]"
        src="https://uludag.edu.tr/img/uu.svg"
        alt=""
      />
      <form
        onSubmit={formik.handleSubmit}
        className="p-8 flex items-center gap-6 justify-center flex-col lg:w-full mt-auto"
      >
        <Typography className=" text-red-700 text-3xl mt-4 border-b-2">Staj Sicil Belgesi</Typography>
        {isAlreadySubmitted && (
          <Alert severity="warning" className="my-4 flex items-center">
            <Typography variant="h5">
              Dikkat Bu form daha önce doldurulmuştur Herhangi bir düzenleme yapılamaz.Sadece bilgi amaçlıdır.
            </Typography>
            <Typography variant="h6">
              Bir yanlışlık olduğunu düşünüyorsanız lütfen staj komisyonu ile iletişime geçiniz staj@otomasyon.com
            </Typography>
          </Alert>
        )}
        <Container className="lg:w-1/2 sm:w-full flex flex-col">
          <CustomAutocomplete
            name="interview"
            id="interview"
            disabled
            required
            filterId={data?.data?.interview?.id}
            useACSlice={useGetInterviewACQuery}
            label={'İlgili Mülakat & Staj'}
            value={formik.values.interview}
            onChange={(value) => formik.setFieldValue('interview', value, true) && formik.setStatus(true)}
            error={Boolean(formik.errors?.interview)}
            helperText={formik.errors.interview?.id}
          />

          <Collapse in={data?.data?.form}>
            {data?.data?.form && (
              <Box>
                <Typography className="my-2 text-red-500">Öğrenci Bilgileri: </Typography>
                <Box className="flex items-start flex-col">
                  <Typography>{`Öğrenci Adı Soyadı : ${data.data.student.name} ${data.data.student.last_name}`}</Typography>
                  <Typography>{`Bölümü : ${data.data.form.edu_program}`}</Typography>
                  <Typography>{`Doğum Yeri / Tarihi : ${data.data.form.student_info.birth_place} ${dayjs(data.data.form.student_info.birth_date).format('DD.MM.YYYY')}`}</Typography>
                  <Typography>{`Numarası : ${data.data.student?.school_number || ''}`}</Typography>
                  <Typography>{`TC Kimlik No : ${data.data.student?.tc_number || ''}`}</Typography>
                </Box>
              </Box>
            )}
          </Collapse>

          <Box className="flex gap-4 flex-col">
            <Typography className="my-2 text-red-500"> Kurum Bilgileri: </Typography>
            <Box className="flex flex-col items-start lg:items-center justify-between lg:flex-row">
              <FormLabel className="font-extrabold">Staj Yapılan Firma Adı: </FormLabel>
              <TextField
                className="w-full lg:w-1/2 !p-0"
                id="company_name"
                required
                name="company_name"
                label="Firma adı"
                value={formik.values.company_name}
                onChange={formik.handleChange}
                error={Boolean(formik.errors.company_name)}
                helperText={formik.errors.company_name}
              />
            </Box>
            <Box className="flex flex-col items-start lg:items-center justify-between lg:flex-row">
              <FormLabel className="font-extrabold">Staj Yapılan Firma Adresi:</FormLabel>
              <TextField
                className="w-full lg:w-1/2 !p-0"
                id="address"
                required
                name="address"
                label="Firma adresi"
                value={formik.values.address}
                onChange={formik.handleChange}
                error={Boolean(formik.errors.address)}
                helperText={formik.errors.address}
              />
            </Box>
          </Box>
        </Container>
        <Container className="lg:w-1/2 sm:w-full  flex flex-col gap-4">
          <Typography className="my-2 text-red-500"> Staj Tarihi Ve Çalışma Konuları: </Typography>
          <Box className="flex flex-col items-start lg:items-center justify-between lg:flex-row">
            <FormLabel className="font-extrabold mb-2">Staj Başlama Tarihi: </FormLabel>
            <CustomDateInput
              id="start_date"
              required
              name="start_date"
              label="Başlangıç Tarihi"
              value={dayjs(formik.values.start_date)}
              onChange={(value) => formik.setFieldValue('start_date', dayjs(value).toDate(), true)}
              error={Boolean(formik.errors.start_date)}
              helperText={formik.errors.start_date}
            />
          </Box>
          <Box className="flex flex-col items-start lg:items-center justify-between lg:flex-row">
            <FormLabel className="font-extrabold mb-2">Staj Bitiş Tarihi:</FormLabel>
            <CustomDateInput
              id="end_date"
              required
              name="end_date"
              label="Başlangıç Tarihi"
              value={dayjs(formik.values.end_date)}
              onChange={(value) => formik.setFieldValue('end_date', dayjs(value).toDate(), true)}
              error={Boolean(formik.errors.end_date)}
              helperText={formik.errors.end_date}
            />
          </Box>

          <Box className="flex flex-col items-start lg:items-center justify-between lg:flex-row">
            <FormLabel className="font-extrabold ">Staj Yapılan Departman:</FormLabel>
            <TextField
              className="w-full lg:w-1/2 !p-0"
              required
              id="department"
              name="department"
              label="Departman"
              value={formik.values.department}
              onChange={(e) => formik.setFieldValue('department', e.target.value, true)}
              error={Boolean(formik.errors.department)}
              helperText={formik.errors.department}
            />
          </Box>
          <Box className="flex flex-col items-start lg:items-center justify-between lg:flex-row">
            <FormLabel className="font-extrabold">Öğrencinin Devamsızlık Sayısı: </FormLabel>
            <TextField
              className="w-full lg:w-1/2 !p-0"
              required
              id="days_of_absence"
              name="days_of_absence"
              label="Devamsızlık"
              type="number"
              value={formik.values.days_of_absence}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.days_of_absence)}
              helperText={formik.errors.days_of_absence}
            />
          </Box>
        </Container>
        <Container className="lg:w-1/2 sm:w-full flex flex-col">
          <CustomRadioGroup data={is_edu_program} formik={formik} />
        </Container>
        <Container className="lg:w-1/2 sm:w-full flex flex-col">
          <Typography className="my-2 text-red-500"> Staj Çalışma Değerlendirmesi: </Typography>

          {internship_evulation.map((data) => (
            <CustomRadioGroup
              error={formik.touched[data.type] && Boolean(formik.errors[data.type])}
              helperText={formik.touched[data.type] && formik.errors[data.type]}
              data={data}
              formik={formik}
            />
          ))}
          <Box className="flex flex-col items-start lg:items-center justify-between lg:flex-row">
            <FormLabel className="font-extrabold">Puanlama: </FormLabel>
            <TextField
              className="w-full lg:w-1/2 !p-0"
              id="score"
              required
              name="score"
              label="Puan"
              type="number"
              value={formik.values.score}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.score)}
              helperText={formik.errors.score}
            />
          </Box>
        </Container>
        <Container className="lg:w-1/2 sm:w-full flex flex-col gap-4">
          <Typography className="my-2 text-red-500">Değerlendirmeyi Yapan Yetkilinin: </Typography>
          <Box className="flex flex-col items-start lg:items-center justify-between lg:flex-row">
            <FormLabel className="font-extrabold">Adı-Soyadı: </FormLabel>
            <TextField
              className="w-full lg:w-1/2 !p-0"
              id="auth_name"
              required
              name="auth_name"
              label="Adı-Soyadı"
              value={formik.values.auth_name}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.auth_name)}
              helperText={formik.errors.auth_name}
            />
          </Box>
          <Box className="flex flex-col items-start lg:items-center justify-between lg:flex-row">
            <FormLabel className="font-extrabold">Görevi: </FormLabel>
            <TextField
              className="w-full lg:w-1/2 !p-0"
              id="auth_position"
              required
              name="auth_position"
              label="Görevi"
              value={formik.values.auth_position}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.auth_position)}
              helperText={formik.errors.auth_position}
            />
          </Box>
          <Box className="flex flex-col items-start lg:items-center justify-between lg:flex-row">
            <FormLabel className="font-extrabold">Diploma Ünvanı:</FormLabel>
            <TextField
              className="w-full lg:w-1/2 !p-0"
              id="auth_title"
              required
              name="auth_title"
              label="Diploma Ünvanı"
              value={formik.values.auth_title}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.auth_title)}
              helperText={formik.errors.auth_title}
            />
          </Box>
          <Box className="flex flex-col items-start lg:items-center justify-between lg:flex-row">
            <FormLabel className="font-extrabold ">Sicil No / İsteğe Bağlı:</FormLabel>
            <TextField
              className="w-full lg:w-1/2 !p-0"
              id="reg_number"
              name="reg_number"
              label="Sicil No"
              value={formik.values.reg_number}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.reg_number)}
              helperText={formik.errors.reg_number}
            />
          </Box>
          <Box className="flex flex-col items-start lg:items-center justify-between lg:flex-row">
            <FormLabel className="font-extrabold">TC Kimlik:</FormLabel>
            <TextField
              className="w-full lg:w-1/2 !p-0"
              id="auth_tc_number"
              required
              name="auth_tc_number"
              label="TC Kimlik"
              value={formik.values.auth_tc_number}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.auth_tc_number)}
              helperText={formik.errors.auth_tc_number}
            />
          </Box>
          <Box className="flex flex-col items-start lg:items-center justify-between lg:flex-row">
            <FormLabel className="font-extrabold">Açıklama:</FormLabel>
            <TextField
              multiline
              rows={4}
              className="w-full lg:w-1/2 !p-0"
              id="desc"
              name="desc"
              label="Açıklama"
              value={formik.values.desc}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.desc)}
              helperText={formik.errors.desc}
            />
          </Box>
        </Container>
        <Box className="flex flex-row  my-2 gap-4 w-full justify-evenly">
          <DialogButton
            className="w-full lg:w-1/2 !p-0"
            type="submit"
            onSubmit={formik.submitForm}
            color="success"
            variant="outlined"
            disabled={!formik.isValid || isAlreadySubmitted}
            button="Gönder"
            message={'Bu form bir kez oluşturulduktan sonra değiştirilemez'}
          />

          {data?.data && (
            <PDFDownloadLink
              fileName="FORM"
              document={<PdfConfidentalReport data={data?.data?.interview?.confidentalReport} />}
            >
              {({ loading }) =>
                loading ? (
                  <DownloadButton variant="outlined" loading={loading} text={'Loading...'}></DownloadButton>
                ) : (
                  <DownloadButton variant="outlined" loading={loading} text={'Yazdır'}></DownloadButton>
                )
              }
            </PDFDownloadLink>
          )}
        </Box>
      </form>
    </div>
  );
}

export default CompanyConfidentalReport;
