import { Button, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import CustomDateInput from 'src/components/inputs/CustomDateInput';
import CustomTextInput from 'src/components/inputs/CustomTextInput';
import moment from 'moment';
import {
  useCreateNewStudentInfoMutation,
  useUpdateStudentInfoMutation,
} from 'src/store/services/internForm/internFormApiSlice';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

function StudentInfoAdd({ nextStep, prevStep, internFormData }) {
  const [createNewStudentInfo, { isLoading }] = useCreateNewStudentInfoMutation();
  const [updateStudentInfo, { isLoadingUpdate }] = useUpdateStudentInfoMutation();

  const internFormId = useSelector((state) => state.internForm.id);
  console.log('internFormData', internFormData);
  const studentInfo = internFormData?.student_info;

  const handleNext = () => {
    nextStep();
  };

  const handlePrev = () => {
    prevStep();
  };

  useEffect(() => {
    if (studentInfo?.id) {
      console.log('formil2', internFormData);
      formik.setFieldValue('fathersName', studentInfo.fathers_name, false);
      formik.setFieldValue('mothersName', studentInfo.mothers_name, false);
      formik.setFieldValue('birthDate', studentInfo.birth_date, false);
      formik.setFieldValue('birthPlace', studentInfo.birth_place, false);
      formik.setFieldValue('address', studentInfo.address, false);
    }
  }, [internFormData]);

  const initialValues = {
    fathersName: '',
    mothersName: '',
    birthDate: '',
    birthPlace: '',
    address: '',
  };

  const validationSchema = yup.object({
    fathersName: yup.string().required('Lütfen baba adını girin'),
    mothersName: yup.string().required('Lütfen anne adını girin'),
    birthDate: yup.date().required('Lütfen doğum tarihini girin'),
    birthPlace: yup.string().required('Lütfen doğum yerini girin'),
    address: yup.string().required('Lütfen adresi girin'),
  });

  async function handleSubmit(values) {
    try {
      const payload = { ...values, internFormId: internFormId };
      let response = null;
      if (studentInfo?.id) {
        if (formik.status) {
          response = await updateStudentInfo({ payload: payload, studentInfoId: studentInfo.id }).unwrap();
        }
      } else {
        response = await createNewStudentInfo(payload).unwrap();
      }
      handleNext();
      console.log(response);
    } catch (error) {
      console.log('err', error);
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
      <Typography className="my-4" variant="h4">
        2.Adım Öğrenci Bilgileri
      </Typography>

      <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
        <CustomTextInput
          id="fathersName"
          name="fathersName"
          label="Baba Adı"
          value={formik.values.fathersName}
          onChange={(value) => formik.setFieldValue('fathersName', value.target.value, true) && formik.setStatus(true)}
          error={Boolean(formik.errors.fathersName)}
          helperText={formik.errors.fathersName}
        />
        <CustomTextInput
          id="mothersName"
          name="mothersName"
          label="Anne Adı"
          value={formik.values.mothersName}
          onChange={(value) => formik.setFieldValue('mothersName', value.target.value, true) && formik.setStatus(true)}
          error={Boolean(formik.errors.mothersName)}
          helperText={formik.errors.mothersName}
        />
        <CustomDateInput
          id="birthDate"
          name="birthDate"
          label="Doğum Tarihi"
          value={dayjs(formik.values.birthDate)}
          onChange={(value) => formik.setFieldValue('birthDate', dayjs(value).toDate(), true) && formik.setStatus(true)}
          error={Boolean(formik.errors.birthDate)}
          helperText={formik.errors.birthDate}
        />
        <CustomTextInput
          id="birthPlace"
          name="birthPlace"
          label="Doğum Yeri"
          value={formik.values.birthPlace}
          onChange={(value) => formik.setFieldValue('birthPlace', value.target.value, true) && formik.setStatus(true)}
          error={Boolean(formik.errors.birthPlace)}
          helperText={formik.errors.birthPlace}
        />
        <CustomTextInput
          id="address"
          name="address"
          label="Adres"
          value={formik.values.address}
          onChange={(value) => formik.setFieldValue('address', value.target.value, true) && formik.setStatus(true)}
          error={Boolean(formik.errors.address)}
          helperText={formik.errors.address}
          multiline
          rows={4}
        />
        <Button type="submit" variant="outlined" disabled={!formik.isValid}>
          ilerle
        </Button>
      </form>
    </div>
  );
}

export default StudentInfoAdd;
