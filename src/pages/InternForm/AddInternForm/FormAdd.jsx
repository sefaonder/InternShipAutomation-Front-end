import { Button, List, ListItem, ListItemText, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import * as yup from 'yup';
import moment from 'moment';
import CustomTextInput from 'src/components/inputs/CustomTextInput';
import { useFormik } from 'formik';
import CustomAutocomplete from 'src/components/inputs/CustomAutocomplete';
import { useGetEduYearACQuery, useGetStudentACQuery } from 'src/app/api/autocompleteSlice';
import CustomDateInput from 'src/components/inputs/CustomDateInput';
import { getBusinessDays, shouldDisableDate } from 'src/app/handlers/dateHandlers';
import { useCreateNewFormMutation, useUpdateFormMutation } from 'src/store/services/internForm/internFormApiSlice';
import { setInternFormData } from 'src/store/services/internForm/internFormSlice';
import { useDispatch } from 'react-redux';

function FormAdd({ prevStep, nextStep, internFormData }) {
  const [createNewForm, { isLoading }] = useCreateNewFormMutation();
  const [updateForm, { isLoadingUpdate }] = useUpdateFormMutation();

  const dispatch = useDispatch();

  const handleNext = () => {
    // Önceki adıma git
    nextStep();
  };
  // tatil günlerini çek ve inputlara tatil günlerini ve haftasonlarını ver
  // state ayarlamalarını yap ve gerekli bağlantıları hazırla
  // redux ve apı bağlantılarını yap

  const initialValues = {
    student: {},
    startDate: '',
    endDate: '',
    eduYear: {},
  };

  useEffect(() => {
    if (internFormData?.id) {
      console.log('formil', internFormData);
      formik.setFieldValue('student', internFormData?.student, true);
      formik.setFieldValue('startDate', internFormData.start_date, false);
      formik.setFieldValue('endDate', internFormData.end_date, false);
      formik.setFieldValue('eduYear', internFormData?.edu_year, false);
    }
  }, [internFormData]);

  const validationSchema = yup.object({
    student: yup.object().required('Lütfen öğrenci girin'),
    startDate: yup.date().required('Lütfen Staj başlangıç tarihi girin'),
    endDate: yup
      .date()
      .required('Bitiş tarihi gereklidir')
      .test('is-valid-range', 'Tarih aralığı 60 iş gününden fazla olamaz', function (value) {
        const startDate = this.parent.startDate;
        const businessDays = getBusinessDays(startDate, value, []);
        return businessDays <= 60;
      }),
    eduYear: yup.object().required('Lütfen geçerli bir dönem girin'),
  });

  async function handleSubmit(values) {
    console.log('Step1', values);
    try {
      const payload = { ...values, studentId: values.student.id, eduYearId: values.eduYear.id };
      let response = null;
      if (internFormData?.id) {
        response = await updateForm({ payload: payload, internFormId: internFormData?.id });
      } else {
        response = await createNewForm(payload);
      }
      console.log(response);
      if (response?.data?.data) {
        handleNext();
        dispatch(
          setInternFormData({
            ...values,
            startDate: moment(values.startDate).format(),
            endDate: moment(values.endDate).format(),
            id: response.data.data,
          }),
        );
      }
      console.log('oops something bad req');
    } catch (error) {
      console.log(error);
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
      <Typography variant="h6">Adım 1</Typography>
      <form className="flex flex-col" onSubmit={formik.handleSubmit}>
        <CustomAutocomplete
          name="student"
          id="student"
          useACSlice={useGetStudentACQuery}
          value={formik.values.student}
          onChange={(value) => formik.setFieldValue('student', value, true)}
          error={formik.touched.student && Boolean(formik.errors.student)}
          helperText={formik.touched.student && formik.errors.student}
        />

        <CustomDateInput
          id="startDate"
          name="startDate"
          label="Başlangıç Tarihi"
          shouldDisableDate={(date) => shouldDisableDate(date, [])}
          value={moment(formik.values.startDate)}
          onChange={(value) => formik.setFieldValue('startDate', value, true)}
          error={formik.touched.startDate && Boolean(formik.errors.startDate)}
          helperText={formik.touched.startDate && formik.errors.startDate}
        />

        <CustomDateInput
          id="endDate"
          name="endDate"
          shouldDisableDate={(date) => shouldDisableDate(date, [])}
          label="Doğum Tarihi"
          value={moment(formik.values.endDate)}
          onChange={(value) => formik.setFieldValue('endDate', value, true)}
          error={formik.touched.endDate && Boolean(formik.errors.endDate)}
          helperText={formik.touched.endDate && formik.errors.endDate}
        />

        {formik.values.endDate && formik.values.startDate && (
          <Typography>
            {`Total Day : ${getBusinessDays(formik.values.startDate, formik.values.endDate, [])}`}
          </Typography>
        )}

        <CustomAutocomplete
          name="eduYear"
          id="eduYear"
          useACSlice={useGetEduYearACQuery}
          value={formik.values.eduYear}
          onChange={(value) => formik.setFieldValue('eduYear', value, true)}
          error={formik.touched.eduYear && Boolean(formik.errors.eduYear)}
          helperText={formik.touched.eduYear && formik.errors.eduYear}
        />

        <Button type="submit" variant="outlined" disabled={formik.errors?.length > 0}>
          Gönder
        </Button>
      </form>

      <Button variant="outlined" onClick={handleNext}>
        İlerle
      </Button>
    </div>
  );
}

export default FormAdd;
