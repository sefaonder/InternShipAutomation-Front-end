import { Button, List, ListItem, ListItemText, Typography } from '@mui/material';
import React, { useEffect, useReducer } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import CustomBooleanMultiSelectInput from 'src/components/inputs/CustomBooleanMultiSelectInput';
import CustomBooleanInput from 'src/components/inputs/CustomBooleanInput';
import { permissionControll } from 'src/app/permissions/permissionController';
import { UserRolesEnum } from 'src/app/enums/roleList';
import usePermission from 'src/hooks/usePermission';
import dayjs from 'dayjs';

function FormAdd({ prevStep, nextStep, internFormData, setIsLoading }) {
  const [createNewForm, { isLoading }] = useCreateNewFormMutation();
  const [updateForm, { isLoadingUpdate }] = useUpdateFormMutation();

  const userAuth = useSelector((state) => state.auth);
  const checkPermission = usePermission();

  const isAdvancedComission = checkPermission(UserRolesEnum.COMISSION.id);

  const dispatch = useDispatch();

  const handleNext = () => {
    nextStep();
  };

  const initialValues = {
    student: {
      id: '',
    },
    startDate: '',
    endDate: '',
    eduYear: {
      id: '',
    },
    isInTerm: true,
    weekDayWork: [],
  };

  useEffect(() => {
    if (internFormData?.id) {
      console.log('formil', internFormData);
      formik.setFieldValue('student', internFormData?.student, false);
      formik.setFieldValue('startDate', internFormData.start_date, false);
      formik.setFieldValue('endDate', internFormData.end_date, false);
      formik.setFieldValue('eduYear', internFormData?.edu_year, false);
      formik.setFieldValue('isInTerm', internFormData.isInTerm, false);
      formik.setFieldValue('weekDayWork', internFormData.weekDayWork, false);
    }
  }, [internFormData]);

  const validationSchema = yup.object({
    isInTerm: yup.boolean().optional(),
    weekDayWork: yup
      .array()
      .min(1, 'En az bir gün haftalık staj tarihi seçiniz')
      .required('Lütfen Staj yapılacak günleri seçiniz'),
    student: yup.object().shape({
      id: yup.string().required('Lütfen öğrenci girin'),
    }),
    startDate: yup.date().required('Lütfen Staj başlangıç tarihi girin'),
    endDate: yup
      .date()
      .required('Bitiş tarihi gereklidir')
      .test('is-valid-range', 'Tarih aralığı 60 iş gününden fazla olamaz', function (value) {
        const startDate = this.parent.startDate;
        const weekDayWork = this.parent.weekDayWork;
        const businessDays = getBusinessDays(startDate, value, [], weekDayWork);
        return businessDays <= 60;
      }),
    eduYear: yup.object().shape({
      id: yup.string().required('Lütfen geçerli bir dönem girin'),
    }),
  });

  async function handleSubmit(values) {
    setIsLoading(true);
    try {
      const payload = { ...values, studentId: values.student.id, eduYearId: values.eduYear.id };
      let response = null;

      if (internFormData?.id) {
        if (formik.status) {
          response = await updateForm({ payload: payload, internFormId: internFormData?.id });
        }
      } else {
        response = await createNewForm(payload);
      }
      console.log(response);
      if (response?.data?.data) {
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
    } finally {
      setIsLoading(false);
      handleNext();
    }
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
  });

  // console.log('formik.dirty', formik.dirty);
  // console.log('formik.status', formik.status);
  // console.log('formik', formik.errors);

  const weekDaysOfInternship = [
    { id: 0, name: 'Pazar' },
    { id: 1, name: 'Pazartesi' },
    { id: 2, name: 'Salı' },
    { id: 3, name: 'Çarşamba' },
    { id: 4, name: 'Perşembe' },
    { id: 5, name: 'Cuma' },
    { id: 6, name: 'Cumartesi' },
  ];

  console.log('formik.values', formik.values);

  return (
    <div>
      <Typography className="my-4" variant="h4">
        1.Adım Staj Formu Bilgileri
      </Typography>
      <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
        <CustomBooleanInput
          name="isInTerm"
          id="isInTerm"
          label="Dönem içi staj"
          value={formik.values.isInTerm}
          onChange={(value) => formik.setFieldValue('isInTerm', value, true) && formik.setStatus(true)}
        />

        <CustomAutocomplete
          name="student"
          id="student"
          disabled={internFormData?.id}
          required
          filterId={!isAdvancedComission && userAuth?.userId}
          useACSlice={useGetStudentACQuery}
          label={'Öğrenci'}
          value={formik.values.student}
          onChange={(value) => formik.setFieldValue('student', value, true) && formik.setStatus(true)}
          error={Boolean(formik.errors?.student)}
          helperText={formik.errors.student?.id}
        />

        <CustomBooleanMultiSelectInput
          name="weekDayWork"
          id="weekDayWork"
          label="Staj Yapılacak günler"
          required
          value={formik.values.weekDayWork}
          onChange={(value) => formik.setFieldValue('weekDayWork', value, true) && formik.setStatus(true)}
          disableOption={0}
          options={weekDaysOfInternship}
          error={Boolean(formik.errors.weekDayWork)}
          helperText={formik.errors.weekDayWork}
        />

        <CustomDateInput
          id="startDate"
          name="startDate"
          required
          label="Başlangıç Tarihi"
          shouldDisableDate={(date) => shouldDisableDate(date, [], formik.values.weekDayWork)}
          disabled={formik.values.weekDayWork.length < 0}
          value={dayjs(formik.values.startDate)}
          onChange={(value) => formik.setFieldValue('startDate', dayjs(value).toDate(), true) && formik.setStatus(true)}
          error={Boolean(formik.errors.startDate)}
          helperText={formik.errors.startDate}
        />

        <CustomDateInput
          id="endDate"
          name="endDate"
          required
          shouldDisableDate={(date) => shouldDisableDate(date, [], formik.values.weekDayWork)}
          label="Bitiş Tarihi"
          disabled={formik.values.weekDayWork.length < 0}
          value={dayjs(formik.values.endDate)}
          onChange={(value) => formik.setFieldValue('endDate', dayjs(value).toDate(), true) && formik.setStatus(true)}
          error={Boolean(formik.errors.endDate)}
          helperText={formik.errors.endDate}
        />

        {formik.values.endDate && formik.values.startDate && formik.values.weekDayWork && (
          <Typography>
            {`Total Day : ${getBusinessDays(formik.values.startDate, formik.values.endDate, [], formik.values.weekDayWork)}`}
          </Typography>
        )}

        <CustomAutocomplete
          name="eduYear"
          id="eduYear"
          required
          useACSlice={useGetEduYearACQuery}
          value={formik.values.eduYear}
          label={'Staj Dönemi'}
          onChange={(value) => formik.setFieldValue('eduYear', value, true) && formik.setStatus(true)}
          error={Boolean(formik.errors.eduYear?.id)}
          helperText={formik.errors.eduYear?.id}
        />

        <Button type="submit" variant="outlined" disabled={!formik.isValid}>
          Gönder
        </Button>
      </form>
    </div>
  );
}

export default FormAdd;
