import { Button, Typography } from '@mui/material';
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
import CustomDateInput from 'src/components/inputs/CustomDateInput';
import moment from 'moment';
import { shouldDisableDate } from 'src/app/handlers/dateHandlers';
import CustomDateTimeInput from 'src/components/inputs/CustomDateTimeInput';
import dayjs from 'dayjs';

function InterviewAdd() {
  const [createNewInterview, { isLoading }] = useCreateNewInterviewMutation();
  const [updateInterview, { isLoadingUpdate }] = useUpdateInterviewMutation();

  const navigate = useNavigate();
  const interviewData = useSelector((state) => state.interview);

  const initialValues = {
    comission: {},
    internStatus: {},
    date: '',
  };

  useEffect(() => {
    if (interviewData?.id) {
      console.log('formil', interviewData);
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
      console.log('response', response);
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

  console.log('formik', formik.values);

  return (
    <div>
      <Typography variant="h6">Mülakat</Typography>
      <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
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
          disabled={interviewData?.id}
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
