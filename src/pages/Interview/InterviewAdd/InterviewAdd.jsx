import { Alert, Button, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetComissionACQuery, useGetInternStatusACQuery } from 'src/app/api/autocompleteSlice';
import CustomAutocomplete from 'src/components/inputs/CustomAutocomplete';
import {
  useCreateNewInterviewMutation,
  useUpdateInterviewMutation,
} from 'src/store/services/interview/interviewApiSlice';

import CustomDateTimeInput from 'src/components/inputs/CustomDateTimeInput';
import dayjs from 'dayjs';
import { projectSnackbar } from 'src/app/handlers/ProjectSnackbar';

function InterviewAdd({ interview, interviewId, isLoadingState }) {
  const [createNewInterview, { isLoading }] = useCreateNewInterviewMutation();
  const [updateInterview, { isLoadingUpdate }] = useUpdateInterviewMutation();

  const navigate = useNavigate();
  const interviewData = interview?.data;

  const initialValues = {
    comission: {},
    internStatus: {},
    date: '',
  };

  useEffect(() => {
    if (interviewData?.id) {
      formik.setFieldValue('comission', interviewData.comission, false);
      formik.setFieldValue('internStatus', interviewData.internStatus, false);
      formik.setFieldValue('date', interviewData.date, false);
    }
  }, [interviewData]);

  const validationSchema = yup.object({
    comission: yup.object().shape({
      id: yup.string().required('Lütfen Mülakat Yetkilisi Girin'),
    }),
    internStatus: yup.object().shape({
      id: yup.string().required('Lütfen geçerli bir Staj Durumu Girin'),
    }),
    date: yup.date().required('Lütfen Mülakat Tarihi Seçin'),
  });

  async function handleSubmit(values) {
    try {
      const payload = {
        ...values,
        comissionId: values.comission.id,
        internStatusId: values.internStatus.id,
      };
      let response = null;
      if (interviewData?.id) {
        response = await updateInterview({ payload: payload, interviewId: interviewData?.id });
      } else {
        response = await createNewInterview(payload);
      }

      if (response.data) {
        projectSnackbar(response.data.message, { variant: 'success' });
      }
    } catch (error) {
      console.log(error);
    } finally {
      if (interviewData?.id) {
        navigate('/interview/' + interviewData?.id);
      } else {
        navigate('/interview');
      }
    }
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
  });

  return (
    <div>
      <Typography variant="h4" className="my-4">
        Mülakat
      </Typography>
      <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
        <Alert severity="warning">
          <Typography>
            <b>Dikkat</b>, Mülakatın Tanımlanması veya Mevcut Mülakatın Güncellenmesi otomatik olarak staj durumunu{' '}
            <b>güncellemez</b>, lütfen ilgili Staj Durumunu'da güncelleyiniz
          </Typography>
        </Alert>
        <CustomAutocomplete
          name="internStatus"
          id="internStatus"
          disabled={interviewData?.id}
          required
          useACSlice={useGetInternStatusACQuery}
          label={'İlgili Staj Durumu'}
          value={formik.values.internStatus}
          onChange={(value) => formik.setFieldValue('internStatus', value, true) && formik.setStatus(true)}
          error={Boolean(formik.errors?.internStatus)}
          helperText={formik.errors.internStatus?.id}
        />

        <CustomAutocomplete
          name="comission"
          id="comission"
          required
          useACSlice={useGetComissionACQuery}
          label={'Mülakat Yetkilisi'}
          value={formik.values.comission}
          onChange={(value) => formik.setFieldValue('comission', value, true) && formik.setStatus(true)}
          error={Boolean(formik.errors?.comission)}
          helperText={formik.errors.comission?.id}
        />

        <CustomDateTimeInput
          id="date"
          name="date"
          required
          label="Mülakat Tarihi"
          value={dayjs(formik.values.date)}
          onChange={(value) => formik.setFieldValue('date', dayjs(value).toDate(), true) && formik.setStatus(true)}
          error={Boolean(formik.errors.date)}
          helperText={formik.errors.date}
        />

        <Button type="submit" variant="outlined" disabled={!formik.isValid}>
          Kaydet
        </Button>
      </form>
    </div>
  );
}

export default InterviewAdd;
