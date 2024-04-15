import { Button, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as yup from 'yup';
import CustomDateInput from 'src/components/inputs/CustomDateInput';
import CustomTextInput from 'src/components/inputs/CustomTextInput';
import moment from 'moment';
import { useCreateNewStudentInfoMutation } from 'src/store/services/internForm/internFormApiSlice';

function StudentInfoAdd({ nextStep, prevStep }) {
  const [data, setData] = useState('');
  const [createNewStudentInfo, { isLoading }] = useCreateNewStudentInfoMutation();

  const handleNext = () => {
    // Adım 1 verileri işle
    console.log('Adım 1 verisi:', data);
    // Sonraki adıma git
    nextStep();
  };

  const handlePrev = () => {
    prevStep();
  };

  const initialValues = {
    fathersName: '',
    mothersName: '',
    birthDate: '11.06.2003',
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
    console.log('Step1', values);
    try {
      const payload = { ...values, birthDate: moment(values.birthDate).toISOString() };
      const response = await createNewStudentInfo(payload);
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
      <Typography variant="h6">Öğrenci Bilgileri</Typography>

      <form className="flex flex-col" onSubmit={formik.handleSubmit}>
        <CustomTextInput
          id="fathersName"
          name="fathersName"
          label="Baba Adı"
          value={formik.values.fathersName}
          onChange={formik.handleChange}
          error={formik.touched.fathersName && Boolean(formik.errors.fathersName)}
          helperText={formik.touched.fathersName && formik.errors.fathersName}
        />
        <CustomTextInput
          id="mothersName"
          name="mothersName"
          label="Anne Adı"
          value={formik.values.mothersName}
          onChange={formik.handleChange}
          error={formik.touched.mothersName && Boolean(formik.errors.mothersName)}
          helperText={formik.touched.mothersName && formik.errors.mothersName}
        />
        <CustomDateInput
          id="birthDate"
          name="birthDate"
          label="Doğum Tarihi"
          value={moment(formik.values.birthDate)}
          onChange={(value) => formik.setFieldValue('birthDate', value, true)}
          error={formik.touched.birthDate && Boolean(formik.errors.birthDate)}
          helperText={formik.touched.birthDate && formik.errors.birthDate}
        />
        <CustomTextInput
          id="birthPlace"
          name="birthPlace"
          label="Doğum Yeri"
          value={formik.values.birthPlace}
          onChange={formik.handleChange}
          error={formik.touched.birthPlace && Boolean(formik.errors.birthPlace)}
          helperText={formik.touched.birthPlace && formik.errors.birthPlace}
        />
        <CustomTextInput
          id="address"
          name="address"
          label="Adres"
          value={formik.values.address}
          onChange={formik.handleChange}
          error={formik.touched.address && Boolean(formik.errors.address)}
          helperText={formik.touched.address && formik.errors.address}
          multiline
          rows={4}
        />
        <Button type="submit" variant="outlined" disabled={formik.errors?.length > 0}>
          ilerle
        </Button>
      </form>
      <Button variant="outlined" onClick={handlePrev}>
        Geri
      </Button>
      <Button variant="outlined" onClick={handleNext}>
        Sonraki
      </Button>
    </div>
  );
}

export default StudentInfoAdd;
