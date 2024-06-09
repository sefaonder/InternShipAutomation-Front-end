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
import { PDFDownloadLink, pdf } from '@react-pdf/renderer';
import PdfConfidentalReport from 'src/PDF/confidentalReport/PdfConfidentalReport';
import DownloadButton from 'src/components/inputs/DownloadButton';
import DialogButton from 'src/components/inputs/DialogButton';
import { enqueueSnackbar } from 'notistack';
import { saveAs } from 'file-saver';
import { projectSnackbar } from 'src/app/handlers/ProjectSnackbar';
import { capitalizeFirstLetter } from 'src/app/handlers/stringParsers';

function CompanyConfidentalReport() {
  const navigate = useNavigate();

  const { token } = useParams(); // URL'den token parametresini alıyoruz
  const { data, isLoading, isSuccess, isError, error, refetch } = useGetCompanyConfidentalReportQuery(token, {
    skip: !Boolean(token),
  });

  const isAlreadySubmitted = data?.data?.interview?.confidentalReport?.id;

  const [createCompanyConfidentalReport, { isLoading: isLoadingCreate }] = useCreateCompanyConfidentalReportMutation();
  const [loadingDownload, setLoadingDownload] = useState(true);

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
    { name: 'Çalışmada Dikkat ve Sorumluluk', type: 'responsibility', data: ['İyi', 'Orta', 'İyi Değil'] },
    { name: 'İşi Yapmadaki Başarısı', type: 'success', data: ['İyi', 'Orta', 'İyi Değil'] },
    { name: 'Öğrenme ve Araştırma İlgisi', type: 'interest', data: ['İyi', 'Orta', 'İyi Değil'] },
    { name: 'Üstelerine Karşı Davranışı', type: 'behaviour_to_auths', data: ['İyi', 'Orta', 'İyi Değil'] },
    { name: 'Çalışma Arkadaşlarına Davranışı', type: 'behaviour_to_coworkers', data: ['İyi', 'Orta', 'İyi Değil'] },
    { name: 'İş Güvenliği Kurallarına Uyumu', type: 'work_safety', data: ['İyi', 'Orta', 'İyi Değil'] },
    { name: 'Meslek Bilgi Düzeyi', type: 'competence', data: ['İyi', 'Orta', 'İyi Değil'] },
  ];

  const validationSchema = yup.object({
    interview: yup.object().shape({
      id: yup.string().required('Lütfen İlgili Mülakatı seçin'),
    }),
    desc: yup.string().optional('Bu alan zorunludur'),
    company_name: yup.string().required('Bu alan zorunludur'),
    address: yup.string().required('Bu alan zorunludur'),
    days_of_absence: yup.number().required('Bu alan zorunludur'),
    department: yup.string().required('Bu alan zorunludur'),
    is_edu_program: yup.string().required('Bu alan zorunludur'),
    responsibility: yup.string().required('Bu alan zorunludur'),
    success: yup.string().required('Bu alan zorunludur'),
    interest: yup.string().required('Bu alan zorunludur'),
    behaviour_to_auths: yup.string().required('Bu alan zorunludur'),
    behaviour_to_coworkers: yup.string().required('Bu alan zorunludur'),
    work_safety: yup.string().required('Bu alan zorunludur'),
    competence: yup.string().required('Bu alan zorunludur'),
    auth_name: yup.string().required('Bu alan zorunludur'),
    auth_position: yup.string().required('Bu alan zorunludur'),
    reg_number: yup.string().optional('Bu alan zorunludur'),
    auth_tc_number: yup
      .string()
      .required('Bu alan zorunludur')
      .min(11, 'En az 11 karakter')
      .max(11, 'En fazla 11 karakter'),
    auth_title: yup.string().required('Bu alan zorunludur'),
    score: yup
      .number()
      .required('Bu alan zorunludur')
      .min(0, 'en az 0 puan olabilir')
      .max(100, 'en fazla 100 puan olabilir'),
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

  const ScrollToTopButton = () => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };
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

        if (response.data) {
          projectSnackbar(response.data.message, { variant: 'success' });
        }
        refetch();
        ScrollToTopButton();
      }
    } catch (error) {
      projectSnackbar('000000', { variant: 'error' });
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
    enableReinitialize: true,
  });

  const submitForm = async (event) => {
    event.preventDefault(); // prevent page reload
    setLoadingDownload(false);
    const blob = await pdf(<PdfConfidentalReport data={pdfDataPrep(data.data)} />).toBlob();
    saveAs(blob, 'uludag.pdf');
    setLoadingDownload(true);
  };

  const pdfDataPrep = (data) => {
    if (!data) return [];
    return {
      interview: {
        student: {
          name: data.student.name,
          last_name: data.student.last_name,
          school_number: data.student.school_number,
          tc_number: data.student.tc_number,
        },
        internStatus: {
          form: {
            student_info: {
              birth_place: data.form.student_info.birth_place,
              birth_date: data.form.student_info.birth_date,
            },
          },
        },
      },
      company_name: data.interview.confidentalReport.company_name,
      address: data.interview.confidentalReport.address,
      start_date: data.interview.confidentalReport.start_date,
      end_date: data.interview.confidentalReport.end_date,
      days_of_absence: data.interview.confidentalReport.days_of_absence,
      department: data.interview.confidentalReport.department,
      is_edu_program: data.interview.confidentalReport.is_edu_program,
      auth_name: data.interview.confidentalReport.auth_name,
      auth_position: data.interview.confidentalReport.auth_position,
      reg_number: data.interview.confidentalReport.reg_number,
      intern_evaluation: {
        responsibility: data.interview.confidentalReport.intern_evaluation.responsibility,
        success: data.interview.confidentalReport.intern_evaluation.success,
        interest: data.interview.confidentalReport.intern_evaluation.interest,
        behaviour_to_auths: data.interview.confidentalReport.intern_evaluation.behaviour_to_auths,
        behaviour_to_coworkers: data.interview.confidentalReport.intern_evaluation.behaviour_to_coworkers,
        work_safety: data.interview.confidentalReport.intern_evaluation.work_safety,
        competence: data.interview.confidentalReport.intern_evaluation.competence,
      },
    };
  };
  console.log('formik', formik.values);
  console.log('formikerrors', formik.errors);

  return (
    <div className="flex lg:m-16 m-4 mt-12 w-full lg:w-1/2 items-center justify-center border-2 relative bg-white rounded-xl">
      <img
        className="w-20 left-2/4 -translate-x-2/4 absolute top-[-40px]"
        src="https://uludag.edu.tr/img/uu.svg"
        alt=""
      />
      <Container className="flex flex-col items-center">
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 w-full mt-auto">
          <Container className="flex flex-col relative items-center justify-center w-full mt-10 gap-4">
            <Typography className=" text-red-700 text-3xl mt-4 border-b-2">Staj Sicil Belgesi</Typography>
            {data?.data && (
              <Box className="">
                <DownloadButton loadingDownload={loadingDownload} submitForm={submitForm} variant="outlined" />
              </Box>
            )}
          </Container>
          <Box className="flex flex-col gap-4 mb-4">
            <Alert severity="info" className="flex items-center">
              <Typography variant="h5">
                Ulaşımın daha pratik olması maksadıyla uygun görülürse, Gizli Sicil Fişi kapalı ve mühürlenmiş bir zarfa
                konulmak suretiyle, öğrenci ile gönderilebilir.
              </Typography>
            </Alert>
            {isAlreadySubmitted && (
              <Alert severity="warning" className=" flex items-center">
                <Typography variant="h5">
                  Dikkat Bu form daha önce doldurulmuştur Herhangi bir düzenleme yapılamaz.Sadece bilgi amaçlıdır.
                </Typography>
                <Typography variant="h6">
                  Bir yanlışlık olduğunu düşünüyorsanız lütfen staj komisyonu ile iletişime geçiniz staj@otomasyon.com
                </Typography>
              </Alert>
            )}
          </Box>
          <Container className="flex flex-col gap-4">
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
                  <Typography className="my-2 text-red-500 text-lg border-b-2">Öğrenci Bilgileri</Typography>
                  <Box className="flex items-start flex-col">
                    <Typography>{`Öğrenci Adı Soyadı : ${data.data.student.name} ${data.data.student.last_name}`}</Typography>
                    <Typography>{`Bölümü : ${data.data.form.edu_program}`}</Typography>
                    <Typography>{`Doğum Yeri / Tarihi : ${data.data.form.student_info.birth_place} / ${dayjs(data.data.form.student_info.birth_date).format('DD.MM.YYYY')}`}</Typography>
                    <Typography>{`Okul Numarası : ${data.data.student?.school_number || ''}`}</Typography>
                    <Typography>{`T.C Kimlik Numarası : ${data.data.student?.tc_number || ''}`}</Typography>
                  </Box>
                </Box>
              )}
            </Collapse>

            <Box className="flex gap-4 flex-col">
              <Typography className="my-2 text-lg text-red-500 border-b-2"> Kurum Bilgileri</Typography>

              <Box className="flex items-start justify-between flex-col gap-4">
                <FormLabel className="font-extrabold mb-2">Staj Yapılan Firma Adı</FormLabel>
                <TextField
                  className="w-full"
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
              <Box className="flex items-start justify-between flex-col gap-4">
                <FormLabel className="font-extrabold mb-2">Staj Yapılan Firma Adresi</FormLabel>
                <TextField
                  className="w-full"
                  id="address"
                  required
                  name="address"
                  label="Firma adresi"
                  multiline
                  rows={3}
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  error={Boolean(formik.errors.address)}
                  helperText={formik.errors.address}
                />
              </Box>
            </Box>
          </Container>
          <Container className="flex flex-col gap-4">
            <Typography className="my-2 text-red-500 text-lg border-b-2"> Staj Tarihi Ve Çalışma Konuları</Typography>
            <Box className="flex items-start justify-between flex-col gap-4">
              <FormLabel className="font-extrabold mb-2">Staj Başlama Tarihi</FormLabel>
              <CustomDateInput
                id="start_date"
                required
                style={{ width: '100%' }}
                name="start_date"
                label="Başlangıç Tarihi"
                value={dayjs(formik.values.start_date)}
                onChange={(value) => formik.setFieldValue('start_date', dayjs(value).toDate(), true)}
                error={Boolean(formik.errors.start_date)}
                helperText={formik.errors.start_date}
              />
            </Box>
            <Box className="flex items-start justify-between flex-col gap-4">
              <FormLabel className="font-extrabold mb-2">Staj Bitiş Tarihi:</FormLabel>
              <CustomDateInput
                id="end_date"
                required
                style={{ width: '100%' }}
                name="end_date"
                label="Başlangıç Tarihi"
                value={dayjs(formik.values.end_date)}
                onChange={(value) => formik.setFieldValue('end_date', dayjs(value).toDate(), true)}
                error={Boolean(formik.errors.end_date)}
                helperText={formik.errors.end_date}
              />
            </Box>

            <Box className="flex items-start justify-between flex-col gap-4">
              <FormLabel className="font-extrabold mb-2">Staj Yapılan Departman</FormLabel>
              <TextField
                className="w-full"
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
            <Box className="flex items-start justify-between flex-col gap-4">
              <FormLabel className="font-extrabold mb-2">Öğrencinin Devamsızlık Sayısı</FormLabel>
              <TextField
                className="w-full"
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
          <Container className="w-full flex flex-col">
            <CustomRadioGroup data={is_edu_program} formik={formik} />
          </Container>
          <Container className="w-full flex flex-col">
            <Typography className="my-2 text-red-500 text-lg border-b-2"> Staj Çalışma Değerlendirmesi</Typography>

            {internship_evulation.map((data) => (
              <CustomRadioGroup
                error={formik.touched[data.type] && Boolean(formik.errors[data.type])}
                helperText={formik.touched[data.type] && formik.errors[data.type]}
                data={data}
                formik={formik}
              />
            ))}
            <Box className="flex items-start justify-between flex-col gap-4">
              <FormLabel className="font-extrabold mb-2">Puanlama</FormLabel>
              <TextField
                className="w-full"
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
          <Container className="flex flex-col gap-4">
            <Typography className="my-2 text-red-500 text-lg border-b-2">Değerlendirmeyi Yapan Yetkilinin</Typography>
            <Box className="flex items-start justify-between flex-col gap-4">
              <FormLabel className="font-extrabold mb-2">Adı-Soyadı</FormLabel>
              <TextField
                className="w-full"
                id="auth_name"
                required
                name="auth_name"
                label="Adı-Soyadı"
                value={formik.values.auth_name}
                onChange={(value) => formik.setFieldValue('auth_name', capitalizeFirstLetter(value.target.value), true)}
                error={Boolean(formik.errors.auth_name)}
                helperText={formik.errors.auth_name}
              />
            </Box>
            <Box className="flex items-start justify-between flex-col gap-4">
              <FormLabel className="font-extrabold mb-2">Görevi</FormLabel>
              <TextField
                className="w-full"
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
            <Box className="flex items-start justify-between flex-col gap-4">
              <FormLabel className="font-extrabold mb-2">Diploma Ünvanı</FormLabel>
              <TextField
                className="w-full"
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
            <Box className="flex items-start justify-between flex-col gap-4">
              <FormLabel className="font-extrabold mb-2">Sicil No / İsteğe Bağlı</FormLabel>
              <TextField
                className="w-full"
                id="reg_number"
                name="reg_number"
                label="Sicil No"
                value={formik.values.reg_number}
                onChange={formik.handleChange}
                error={Boolean(formik.errors.reg_number)}
                helperText={formik.errors.reg_number}
              />
            </Box>
            <Box className="flex items-start justify-between flex-col gap-4">
              <FormLabel className="font-extrabold mb-2">T.C Kimlik Numarası</FormLabel>
              <TextField
                className="w-full"
                id="auth_tc_number"
                required
                name="auth_tc_number"
                label="T.C Kimlik Numarası"
                value={formik.values.auth_tc_number}
                onChange={formik.handleChange}
                error={Boolean(formik.errors.auth_tc_number)}
                helperText={formik.errors.auth_tc_number}
              />
            </Box>
            {/* <Box className="flex flex-col items-start lg:items-center justify-between lg:flex-row">
            <FormLabel className="font-extrabold mb-2">Açıklama:</FormLabel>
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
          </Box> */}
          </Container>
          <Box className="flex flex-col my-4 gap-4 w-full justify-evenly">
            <DialogButton
              className="w-full"
              type="submit"
              onSubmit={formik.submitForm}
              color="success"
              variant="outlined"
              disabled={!formik.isValid || isAlreadySubmitted}
              button="Gönder"
              message={'Bu form bir kez oluşturulduktan sonra değiştirilemez'}
            />
          </Box>
        </form>
      </Container>
    </div>
  );
}

export default CompanyConfidentalReport;
