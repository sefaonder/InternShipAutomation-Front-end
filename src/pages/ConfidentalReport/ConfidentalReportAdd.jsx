import { Box, Button, Container, FormLabel, TextField, Typography } from '@mui/material';
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

const ConfidentalReportAdd = ({ confidentalReport, confidentalReportId }) => {
  const [createConfidentalReport, { isLoading }] = useCreateNewConfidentalReportMutation();
  const [updateConfidentalReport, { isLoadingData }] = useUpdateConfidentalReportMutation();

  const [interviewId, setInterviewId] = useState(null);
  const {
    data,
    isLoading: loadingInfo,
    isSuccess,
  } = useGetCompanyInfoQuery(interviewId, { skip: !Boolean(interviewId) });

  useEffect(() => {
    if (confidentalReport) {
      for (const key in confidentalReport.intern_evaluation) {
        formik.setFieldValue(`${key}`, confidentalReport.intern_evaluation[key]);
      }
      formik.setFieldValue('company_name', confidentalReport.company_name, true);
      formik.setFieldValue('address', confidentalReport.address, true);
      formik.setFieldValue('start_date', confidentalReport.start_date, false);
      formik.setFieldValue('end_date', confidentalReport.end_date, false);
      formik.setFieldValue('days_of_absence', confidentalReport.days_of_absence, false);
      formik.setFieldValue('department', confidentalReport.department, false);
      formik.setFieldValue('is_edu_program', confidentalReport.is_edu_program ? 'Evet' : 'Hayır', false);
      formik.setFieldValue('auth_name', confidentalReport.auth_name, false);
      formik.setFieldValue('auth_position', confidentalReport.auth_position, false);
      formik.setFieldValue('reg_number', confidentalReport.reg_number, false);
      formik.setFieldValue('auth_tc_number', confidentalReport.auth_tc_number, false);
    }
  }, [confidentalReport]);

  const validationSchema = yup.object({
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
    reg_number: yup.string().required('Bu Alan'),
    auth_tc_number: yup.string().required('Bu Alan').min(11, 'En az 11 karakter').max(11, 'En fazla 11 karakter'),
    auth_title: yup.string().required('Bu Alan'),
    score: yup.number().required('Bu Alan').min(0, 'en az 0 puan olabilir').max(100, 'en fazla 100 puan olabilir'),
  });
  const formik = useFormik({
    initialValues: {
      interview: null,
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
      reg_number: '',
      auth_tc_number: '',
      auth_title: '',
      score: '',
    },
    onSubmit: async (values) => {
      console.log('asdsad');
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
          console.log('+++++++++');
          //payload: values, surveyId: surveyId
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
            },
            confidentalReportId: confidentalReportId,
          });
        } else {
          console.log({
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
          });
          await createConfidentalReport({
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
          });
        }
      } catch (err) {}
    },
    validationSchema: validationSchema,
  });
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

  useEffect(() => {
    if (formik.values?.interview?.id && !confidentalReport?.id) {
      setInterviewId(formik.values.interview.id);
    }
  }, [formik.values.interview]);

  useEffect(() => {
    if (data?.data?.form) {
      formik.setFieldValue('company_name', data.data.form.company_info.name, false);
      formik.setFieldValue('address', data.data.form.company_info.address, false);
    }
  }, [data, isSuccess]);

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
            disabled={confidentalReport?.id}
            required
            // filterId={!isAdvancedComission && userAuth?.userId}
            useACSlice={useGetInterviewACQuery}
            label={'İlgili Mülakat & Staj'}
            value={formik.values.interview}
            onChange={(value) => formik.setFieldValue('interview', value, true) && formik.setStatus(true)}
            error={Boolean(formik.errors?.interview)}
            helperText={formik.errors.interview?.id}
          />
          <Typography className="my-2 text-red-500"> Kurum Bilgileri: </Typography>
          <Box className="flex items-center justify-between">
            <FormLabel className="font-extrabold">Staj Yapılan Firma Adı: </FormLabel>
            <TextField
              className="w-1/2 my-0"
              id="company_name"
              name="company_name"
              label="Firma adı"
              margin="normal"
              value={formik.values.company_name}
              onChange={formik.handleChange}
              error={formik.touched.company_name && Boolean(formik.errors.company_name)}
              helperText={formik.touched.company_name && formik.errors.company_name}
            />
          </Box>
          <Box className="flex items-center  justify-between">
            <FormLabel className="font-extrabold">Staj Yapılan Firma Adresi:</FormLabel>
            <TextField
              className="w-1/2 !p-0"
              id="address"
              name="address"
              label="Firma adresi"
              margin="normal"
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
          </Box>
        </Container>
        <Container className="lg:w-1/2 sm:w-full  flex flex-col">
          <Typography className="my-2 text-red-500"> Staj Tarihi Ve Çalışma Konuları: </Typography>
          <Box className="flex items-center justify-between">
            <FormLabel className="font-extrabold">Staj Başlama Tarihi: </FormLabel>
            <CustomDateInput
              id="start_date"
              name="start_date"
              label="Başlangıç Tarihi"
              shouldDisableDate={(date) => shouldDisableDate(date, [])}
              value={dayjs(formik.values.start_date)}
              onChange={(value) => formik.setFieldValue('start_date', dayjs(value).toDate(), true)}
              error={formik.touched.start_date && Boolean(formik.errors.start_date)}
              helperText={formik.touched.start_date && formik.errors.start_date}
            />
          </Box>
          <Box className="flex items-center  justify-between">
            <FormLabel className="font-extrabold">Staj Bitiş Tarihi:</FormLabel>
            <CustomDateInput
              id="end_date"
              name="end_date"
              label="Başlangıç Tarihi"
              shouldDisableDate={(date) => shouldDisableDate(date, [])}
              value={dayjs(formik.values.end_date)}
              onChange={(value) => formik.setFieldValue('end_date', dayjs(value).toDate(), true)}
              error={formik.touched.end_date && Boolean(formik.errors.end_date)}
              helperText={formik.touched.end_date && formik.errors.end_date}
            />
          </Box>

          <Box className="flex items-center  justify-between">
            <FormLabel className="font-extrabold">Staj Yapılan Departman:</FormLabel>
            <TextField
              className="w-1/2"
              id="department"
              name="department"
              label="Departman"
              margin="normal"
              value={formik.values.department}
              onChange={formik.handleChange}
              error={formik.touched.department && Boolean(formik.errors.department)}
              helperText={formik.touched.department && formik.errors.department}
            />
          </Box>
          <Box className="flex items-center justify-between">
            <FormLabel className="font-extrabold">Öğrencinin Devamsızlık Sayısı: </FormLabel>
            <TextField
              className="w-1/2  my-0"
              id="days_of_absence"
              name="days_of_absence"
              label="Devamsızlık"
              margin="normal"
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
          <Typography className="my-2 text-red-500"> Staj Çalışma Değerlendirmesi: </Typography>

          {internship_evulation.map((data) => (
            <CustomRadioGroup
              error={formik.touched[data.type] && Boolean(formik.errors[data.type])}
              helperText={formik.touched[data.type] && formik.errors[data.type]}
              data={data}
              formik={formik}
            />
          ))}
          <Box className="flex items-center justify-between">
            <FormLabel className="font-extrabold">Puanlama: </FormLabel>
            <TextField
              className="w-1/2 my-2"
              id="score"
              name="score"
              label="Puan"
              type="number"
              margin="normal"
              value={formik.values.score}
              onChange={formik.handleChange}
              error={formik.touched.score && Boolean(formik.errors.score)}
              helperText={formik.touched.score && formik.errors.score}
            />
          </Box>
        </Container>
        <Container className="lg:w-1/2 sm:w-full flex flex-col">
          <Typography className="my-2 text-red-500">Değerlendirmeyi Yapan Yetkilinin: </Typography>
          <Box className="flex items-center justify-between">
            <FormLabel className="font-extrabold">Adı-Soyadı: </FormLabel>
            <TextField
              className="w-1/2 my-0"
              id="auth_name"
              name="auth_name"
              label="Adı-Soyadı"
              margin="normal"
              value={formik.values.auth_name}
              onChange={formik.handleChange}
              error={formik.touched.auth_name && Boolean(formik.errors.auth_name)}
              helperText={formik.touched.auth_name && formik.errors.auth_name}
            />
          </Box>
          <Box className="flex items-center justify-between">
            <FormLabel className="font-extrabold">Görevi: </FormLabel>
            <TextField
              className="w-1/2 !p-0"
              id="auth_position"
              name="auth_position"
              label="Görevi"
              margin="normal"
              value={formik.values.auth_position}
              onChange={formik.handleChange}
              error={formik.touched.auth_position && Boolean(formik.errors.auth_position)}
              helperText={formik.touched.auth_position && formik.errors.auth_position}
            />
          </Box>
          <Box className="flex items-center  justify-between">
            <FormLabel className="font-extrabold">Diploma Ünvanı:</FormLabel>
            <TextField
              className="w-1/2 !p-0"
              id="auth_title"
              name="auth_title"
              label="Diploma Ünvanı"
              margin="normal"
              value={formik.values.auth_title}
              onChange={formik.handleChange}
              error={formik.touched.auth_title && Boolean(formik.errors.auth_title)}
              helperText={formik.touched.auth_title && formik.errors.auth_title}
            />
          </Box>
          <Box className="flex items-center  justify-between">
            <FormLabel className="font-extrabold ">Sicil No / İsteğe Bağlı:</FormLabel>
            <TextField
              className="w-1/2 !p-0"
              id="reg_number"
              name="reg_number"
              label="Sicil No"
              margin="normal"
              value={formik.values.reg_number}
              onChange={formik.handleChange}
              error={formik.touched.reg_number && Boolean(formik.errors.reg_number)}
              helperText={formik.touched.reg_number && formik.errors.reg_number}
            />
          </Box>
          <Box className="flex items-center  justify-between">
            <FormLabel className="font-extrabold">TC Kimlik:</FormLabel>
            <TextField
              className="w-1/2 !p-0"
              id="auth_tc_number"
              name="auth_tc_number"
              label="TC Kimlik"
              margin="normal"
              value={formik.values.auth_tc_number}
              onChange={formik.handleChange}
              error={formik.touched.auth_tc_number && Boolean(formik.errors.auth_tc_number)}
              helperText={formik.touched.auth_tc_number && formik.errors.auth_tc_number}
            />
          </Box>
          <Box className="flex items-center  justify-between">
            <FormLabel className="font-extrabold ">Tarih:</FormLabel>
            <TextField
              className="w-1/2 !p-0"
              id="company_address"
              name="company_address"
              label="Tarih"
              margin="normal"
              value={formik.values.company_address}
              onChange={formik.handleChange}
              error={formik.touched.company_address && Boolean(formik.errors.company_address)}
              helperText={formik.touched.company_address && formik.errors.company_address}
            />
          </Box>
        </Container>
        <Button className="px-4 w-1/3 flex my-2" type="submit" color="success" variant="outlined">
          Gönder
        </Button>
      </form>
    </div>
  );
};

export default ConfidentalReportAdd;
