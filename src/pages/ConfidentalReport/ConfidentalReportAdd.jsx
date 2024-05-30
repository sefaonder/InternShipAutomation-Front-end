import { Box, Button, Collapse, Container, FormLabel, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import CustomRadioGroup from '../Survey/SurveyComponents/CustomRadioGroup';
import * as yup from 'yup';

import CustomDateInput from 'src/components/inputs/CustomDateInput';
import moment from 'moment';
import { shouldDisableDate } from 'src/app/handlers/dateHandlers';
import {
  useCreateNewConfidentalReportMutation,
  useUpdateConfidentalReportMutation,
} from 'src/store/services/confidentalReport/confidentalReportApiSlice';
import CustomAutocomplete from 'src/components/inputs/CustomAutocomplete';
import { useGetCompanyInfoQuery } from 'src/store/services/survey/surveyApiSlice';
import { useGetInterviewACQuery } from 'src/app/api/autocompleteSlice';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

import { resetConfidentalReport } from 'src/store/services/confidentalReport/confidentalReportSlice';
import { useDispatch } from 'react-redux';

const ConfidentalReportAdd = ({ confidentalReport, confidentalReportId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [createConfidentalReport, { isLoading }] = useCreateNewConfidentalReportMutation();
  const [updateConfidentalReport, { isLoadingData }] = useUpdateConfidentalReportMutation();

  useEffect(() => {
    if (confidentalReportId && !Boolean(confidentalReport?.data?.id)) {
      // navigate back detail page
      navigate('/confidental-report/' + confidentalReportId);
    }

    if (!confidentalReportId) {
      dispatch(resetConfidentalReport());
    }
  }, []);

  const [interviewId, setInterviewId] = useState(null);
  const {
    data,
    isLoading: loadingInfo,
    isSuccess,
  } = useGetCompanyInfoQuery(interviewId, { skip: !Boolean(interviewId) });

  useEffect(() => {
    if (confidentalReport) {
      for (const key in confidentalReport?.data.intern_evaluation) {
        formik.setFieldValue(`${key}`, confidentalReport?.data.intern_evaluation[key]);
      }
      formik.setFieldValue('interview', { id: confidentalReport?.data?.interview?.id }, false);
      formik.setFieldValue('company_name', confidentalReport?.data.company_name, false);
      formik.setFieldValue('address', confidentalReport?.data.address, false);
      formik.setFieldValue('start_date', confidentalReport?.data.start_date, false);
      formik.setFieldValue('end_date', confidentalReport?.data.end_date, false);
      formik.setFieldValue('days_of_absence', confidentalReport?.data.days_of_absence, false);
      formik.setFieldValue('department', confidentalReport?.data.department, false);
      formik.setFieldValue('is_edu_program', confidentalReport?.data.is_edu_program ? 'Evet' : 'Hayır', false);
      formik.setFieldValue('auth_name', confidentalReport?.data.auth_name, false);
      formik.setFieldValue('auth_position', confidentalReport?.data.auth_position, false);
      formik.setFieldValue('reg_number', confidentalReport?.data.reg_number, false);
      formik.setFieldValue('auth_tc_number', confidentalReport?.data.auth_tc_number, false);
      formik.setFieldValue('auth_title', confidentalReport?.data.auth_title, false);
    }
  }, [confidentalReport?.data]);

  useEffect(() => {
    if (!confidentalReport?.data && data?.data?.form) {
      formik.setFieldValue('company_name', data.data.form.company_info.name, false);
      formik.setFieldValue('address', data.data.form.company_info.address, false);
      formik.setFieldValue('start_date', data.data.form.start_date, false);
      formik.setFieldValue('end_date', data.data.form.end_date, false);
    }
  }, [isSuccess]);

  const validationSchema = yup.object({
    interview: yup.object().shape({
      id: yup.string().required('Lütfen İlgili Mülakatı seçin'),
    }),
    company_name: yup.string().required('Bu Alan').max(100, 'Bu Alan En Fazla 100 Karakter Olabilir.'),
    address: yup.string().required('Bu Alan').max(100, 'Bu Alan En Fazla 100 Karakter Olabilir.'),
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
    reg_number: yup.string().optional('Bu Alan').nullable(),
    auth_tc_number: yup
      .string()
      .required('Bu Alan')
      .matches(/^[0-9]+$/, 'Sadece rakamlar içermelidir')
      .length(11, 'Tam olarak 11 karakter olmalıdır'),
    auth_title: yup.string().required('Bu Alan'),
    score: yup.number().required('Bu Alan').min(0, 'en az 0 puan olabilir').max(100, 'en fazla 100 puan olabilir'),
  });
  const formik = useFormik({
    initialValues: {
      interview: { id: null },
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
      date: '',
      reg_number: '',
      auth_tc_number: '',
      auth_title: '',
      score: '',
    },
    onSubmit: async (values) => {
      try {
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
        if (confidentalReport) {
          await updateConfidentalReport({
            payload: {
              ...restValues,
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
              is_edu_program: values.is_edu_program === 'Evet' ? true : false,
            },
            confidentalReportId: confidentalReportId,
          });
          navigate('/confidental-report/' + confidentalReportId);
        } else {
          await createConfidentalReport({
            ...restValues,
            interviewId: restValues.interview?.id,
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
          navigate('/confidental-report');
        }
      } catch (err) {
        console.log(err);
        navigate('/confidental-report');
      }
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
  });
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

  useEffect(() => {
    if (formik.values?.interview?.id && !confidentalReport?.data?.id) {
      setInterviewId(formik.values.interview.id);
    }
  }, [formik.values.interview]);

  return (
    <div>
      {' '}
      <form
        onSubmit={formik.handleSubmit}
        className="p-8 flex items-center gap-6 justify-center flex-col lg:w-full mt-12"
      >
        {' '}
        <Typography className="my-2 text-blue-700 text-3xl"> Staj Sicil Belgesi: </Typography>
        <Container className="lg:w-1/2 sm:w-full flex flex-col">
          <CustomAutocomplete
            name="interview"
            id="interview"
            disabled={confidentalReport?.data?.id}
            required
            // filterId={!isAdvancedComission && userAuth?.userId}
            disabledTooltipText="Mülakata ait bir kayıt var"
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
                <Box className="flex items-center justify-between">
                  <Typography>{`Öğrenci Adı Soyadı : ${data.data.student.name} ${data.data.student.last_name}`}</Typography>
                  <Typography>{`Bölümü : ${data.data.form.edu_program}`}</Typography>
                </Box>

                <Box className="flex items-center justify-between">
                  <Typography>{`Doğum Yeri / Tarihi : ${data.data.form.student_info.birth_place} ${dayjs(data.data.form.student_info.birth_date).format('DD.MM.YYYY')}`}</Typography>
                  <Typography>{`Numarası : ${data.data.student?.school_number || ''}`}</Typography>
                </Box>

                <Box className="flex items-center justify-between">
                  <Typography>{`TC Kimlik No : ${data.data.student?.tc_number || ''}`}</Typography>
                </Box>
              </Box>
            )}
          </Collapse>

          <Box className="flex gap-4 flex-col">
            <Typography className="my-2 text-red-500 text-lg	border-b-2"> Kurum Bilgileri: </Typography>
            <Box className="flex flex-col items-start lg:items-center justify-between lg:flex-row">
              <FormLabel className="font-extrabold">Staj Yapılan Firma Adı: </FormLabel>
              <TextField
                className="w-full lg:w-1/2 my-0"
                id="company_name"
                name="company_name"
                label="Firma adı"
                value={formik.values.company_name}
                onChange={formik.handleChange}
                error={formik.touched.company_name && Boolean(formik.errors.company_name)}
                helperText={formik.touched.company_name && formik.errors.company_name}
              />
            </Box>
            <Box className="flex flex-col items-start lg:items-center justify-between lg:flex-row">
              <FormLabel className="font-extrabold">Staj Yapılan Firma Adresi:</FormLabel>
              <TextField
                className="w-full lg:w-1/2 !p-0"
                id="address"
                name="address"
                label="Firma adresi"
                value={formik.values.address}
                onChange={formik.handleChange}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
            </Box>
          </Box>
        </Container>
        <Container className="lg:w-1/2 sm:w-full  flex flex-col gap-4">
          <Typography className="my-2 text-red-500 text-lg	border-b-2"> Staj Tarihi Ve Çalışma Konuları: </Typography>
          <Box className="flex flex-col items-start lg:items-center justify-between lg:flex-row">
            <FormLabel className="font-extrabold my-2">Staj Başlama Tarihi: </FormLabel>
            <CustomDateInput
              id="start_date"
              name="start_date"
              className="w-full lg:w-1/2"
              label="Başlangıç Tarihi"
              value={dayjs(formik.values.start_date)}
              onChange={(value) => formik.setFieldValue('start_date', dayjs(value).toDate(), true)}
              error={formik.touched.start_date && Boolean(formik.errors.start_date)}
              helperText={formik.touched.start_date && formik.errors.start_date}
            />
          </Box>
          <Box className="flex flex-col items-start lg:items-center justify-between lg:flex-row">
            <FormLabel className="font-extrabold my-2">Staj Bitiş Tarihi:</FormLabel>
            <CustomDateInput
              id="end_date"
              className="w-full lg:w-1/2"
              name="end_date"
              label="Başlangıç Tarihi"
              value={dayjs(formik.values.end_date)}
              onChange={(value) => formik.setFieldValue('end_date', dayjs(value).toDate(), true)}
              error={formik.touched.end_date && Boolean(formik.errors.end_date)}
              helperText={formik.touched.end_date && formik.errors.end_date}
            />
          </Box>

          <Box className="flex flex-col items-start lg:items-center justify-between lg:flex-row">
            <FormLabel className="font-extrabold">Staj Yapılan Departman:</FormLabel>
            <TextField
              className="w-full lg:w-1/2"
              id="department"
              name="department"
              label="Departman"
              value={formik.values.department}
              onChange={(e) => formik.setFieldValue('department', e.target.value, true)}
              error={formik.touched.department && Boolean(formik.errors.department)}
              helperText={formik.touched.department && formik.errors.department}
            />
          </Box>
          <Box className="flex flex-col items-start lg:items-center justify-between lg:flex-row">
            <FormLabel className="font-extrabold">Öğrencinin Devamsızlık Sayısı: </FormLabel>
            <TextField
              className="w-full lg:w-1/2 my-0"
              id="days_of_absence"
              name="days_of_absence"
              label="Devamsızlık"
              type="number"
              value={formik.values.days_of_absence}
              onChange={formik.handleChange}
              error={formik.touched.days_of_absence && Boolean(formik.errors.days_of_absence)}
              helperText={formik.touched.days_of_absence && formik.errors.days_of_absence}
            />
          </Box>
        </Container>
        <Container className="lg:w-1/2 sm:w-full flex flex-col">
          <CustomRadioGroup data={is_edu_program} formik={formik} />
        </Container>
        <Container className="lg:w-1/2 sm:w-full flex flex-col">
          <Typography className="my-2 text-lg	border-b-2 text-red-500"> Staj Çalışma Değerlendirmesi: </Typography>

          {internship_evulation.map((data, index) => (
            <CustomRadioGroup
              index={index + 1}
              error={formik.touched[data.type] && Boolean(formik.errors[data.type])}
              helperText={formik.touched[data.type] && formik.errors[data.type]}
              data={data}
              formik={formik}
            />
          ))}
          <Box className="flex flex-col items-start lg:items-center justify-between lg:flex-row">
            <FormLabel className="font-extrabold">Puanlama: </FormLabel>
            <TextField
              className="w-full lg:w-1/2 my-2"
              id="score"
              name="score"
              label="Puan"
              type="number"
              value={formik.values.score}
              onChange={formik.handleChange}
              error={formik.touched.score && Boolean(formik.errors.score)}
              helperText={formik.touched.score && formik.errors.score}
            />
          </Box>
        </Container>
        <Container className="lg:w-1/2 sm:w-full flex flex-col gap-4">
          <Typography className="my-2 text-red-500 text-lg	border-b-2">Değerlendirmeyi Yapan Yetkilinin: </Typography>
          <Box className="flex flex-col items-start lg:items-center justify-between lg:flex-row">
            <FormLabel className="font-extrabold m-2">Adı-Soyadı: </FormLabel>
            <TextField
              className="w-full lg:w-1/2 my-0"
              id="auth_name"
              name="auth_name"
              label="Adı-Soyadı"
              value={formik.values.auth_name}
              onChange={formik.handleChange}
              error={formik.touched.auth_name && Boolean(formik.errors.auth_name)}
              helperText={formik.touched.auth_name && formik.errors.auth_name}
            />
          </Box>
          <Box className="flex flex-col items-start lg:items-center justify-between lg:flex-row">
            <FormLabel className="font-extrabold m-2">Görevi: </FormLabel>
            <TextField
              className="w-full lg:w-1/2 !p-0"
              id="auth_position"
              name="auth_position"
              label="Görevi"
              value={formik.values.auth_position}
              onChange={formik.handleChange}
              error={formik.touched.auth_position && Boolean(formik.errors.auth_position)}
              helperText={formik.touched.auth_position && formik.errors.auth_position}
            />
          </Box>
          <Box className="flex flex-col items-start lg:items-center justify-between lg:flex-row">
            <FormLabel className="font-extrabold  m-2">Diploma Ünvanı:</FormLabel>
            <TextField
              className="w-full lg:w-1/2 !p-0"
              id="auth_title"
              name="auth_title"
              label="Diploma Ünvanı"
              value={formik.values.auth_title}
              onChange={formik.handleChange}
              error={formik.touched.auth_title && Boolean(formik.errors.auth_title)}
              helperText={formik.touched.auth_title && formik.errors.auth_title}
            />
          </Box>
          <Box className="flex flex-col items-start lg:items-center justify-between lg:flex-row">
            <FormLabel className="font-extrabold m-2">Sicil No / İsteğe Bağlı:</FormLabel>
            <TextField
              className="w-full lg:w-1/2 !p-0"
              id="reg_number"
              name="reg_number"
              label="Sicil No"
              value={formik.values.reg_number}
              onChange={formik.handleChange}
              error={formik.touched.reg_number && Boolean(formik.errors.reg_number)}
              helperText={formik.touched.reg_number && formik.errors.reg_number}
            />
          </Box>
          <Box className="flex flex-col items-start lg:items-center justify-between lg:flex-row">
            <FormLabel className="font-extrabold m-2">TC Kimlik:</FormLabel>
            <TextField
              className="w-full lg:w-1/2 !p-0"
              id="auth_tc_number"
              name="auth_tc_number"
              label="TC Kimlik"
              value={formik.values.auth_tc_number}
              onChange={formik.handleChange}
              error={formik.touched.auth_tc_number && Boolean(formik.errors.auth_tc_number)}
              helperText={formik.touched.auth_tc_number && formik.errors.auth_tc_number}
            />
          </Box>
          <Button className="px-4 w-full  flex my-2" type="submit" color="success" variant="outlined">
            Gönder
          </Button>
        </Container>
      </form>
    </div>
  );
};

export default ConfidentalReportAdd;
