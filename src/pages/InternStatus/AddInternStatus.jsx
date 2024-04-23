import { Button, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetInternFormACQuery, useGetStudentACQuery } from 'src/app/api/autocompleteSlice';
import { InternStatusEnum } from 'src/app/enums/internStatus';
import InternFormACList from 'src/components/ACLists/InternFormACList';
import CustomAutocomplete from 'src/components/inputs/CustomAutocomplete';
import CustomEnumInput from 'src/components/inputs/CustomEnumInput';
import { useUpdateStatusMutation } from 'src/store/services/internStatus/internStatusApiSlice';
import * as yup from 'yup';

function AddInternStatus() {
  // const [createNewForm, { isLoading }] = useCreateNewFormMutation();
  const [updateStatus, { isLoading }] = useUpdateStatusMutation();
  const navigate = useNavigate();
  const internStatusData = useSelector((state) => state.internStatus);

  const initialValues = {
    student: {},
    form: {},
    interview: {},
    status: '',
  };

  useEffect(() => {
    if (internStatusData?.id) {
      console.log('formil', internStatusData);
      formik.setFieldValue('student', internStatusData.student.student, true);
      formik.setFieldValue('form', internStatusData.form.form, true);
      internStatusData?.interview && formik.setFieldValue('interview', internStatusData.interview.interview, true);
      formik.setFieldValue('status', internStatusData.status, false);
    }
  }, [internStatusData]);

  const validationSchema = yup.object({
    // student: yup.object().required('Lütfen öğrenci girin'),
    // startDate: yup.date().required('Lütfen Staj başlangıç tarihi girin'),
    // endDate: yup
    //   .date()
    //   .required('Bitiş tarihi gereklidir')
    //   .test('is-valid-range', 'Tarih aralığı 60 iş gününden fazla olamaz', function (value) {
    //     const startDate = this.parent.startDate;
    //     const businessDays = getBusinessDays(startDate, value, []);
    //     return businessDays <= 60;
    //   }),
    status: yup.string().required('Lütfen Durumu Seçin'),
  });

  async function handleSubmit(values) {
    console.log('Step1', values);
    try {
      const payload = {
        ...values,
        studentId: values.student.id,
        formId: values.form.id,
        interviewId: values?.interview?.id,
      };
      let response = null;
      if (internStatusData?.id) {
        response = await updateStatus({ payload: payload, internStatusId: internStatusData?.id });
      } else {
        console.log('hii');
      }
      console.log(response);
      if (response?.data) {
        // handleNext();
        navigate('/intern-status');
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

  function StudentACLabelFunction(value) {
    return value?.name ? `${value.name} ${value.last_name}` : '';
  }

  function InternFormACLabelFunction(value) {
    return value?.id ? `${value.id}` : '';
  }

  const filterOptions = (options, { inputValue }) => {
    return options.filter((option) => {
      // Arama metniyle eşleşen seçenekleri filtrele
      const searchText = inputValue.toLowerCase();
      const { last_name, name, school_number } = option;
      return (
        last_name.toLowerCase().includes(searchText) ||
        name.toLowerCase().includes(searchText) ||
        school_number.toLowerCase().includes(searchText)
      );
    });
  };
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
          filterOptions={filterOptions}
          onChange={(value) => formik.setFieldValue('student', value, true)}
          error={formik.touched.student && Boolean(formik.errors.student)}
          helperText={formik.touched.student && formik.errors.student}
          labelFunc={StudentACLabelFunction}
          renderOption={(props, option) => (
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              <ListItem
                key={option.school_number}
                {...props}
                disablePadding
                button
                // style={{ borderBottom: `1px solid ${theme.palette.divider}` }}
              >
                <ListItemText primary={option?.name + ' ' + option?.last_name} secondary={option?.school_number} />
              </ListItem>
            </List>
          )}
        />

        <CustomAutocomplete
          name="form"
          id="form"
          useACSlice={useGetInternFormACQuery}
          value={formik.values.form}
          //   filterOptions={filterOptions}
          onChange={(value) => formik.setFieldValue('form', value, true)}
          error={formik.touched.form && Boolean(formik.errors.form)}
          helperText={formik.touched.form && formik.errors.form}
          labelFunc={InternFormACLabelFunction}
          renderOption={(props, option) => (
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              <ListItem
                key={option.id}
                {...props}
                disablePadding
                button
                // style={{ borderBottom: `1px solid ${theme.palette.divider}` }}
              >
                <ListItemText primary={option?.id} secondary={option?.school_number} />
              </ListItem>
            </List>
          )}
        />

        <CustomEnumInput
          id="status"
          name="status"
          value={formik.values.status}
          onChange={formik.handleChange}
          enumObject={InternStatusEnum}
        />

        <Button type="submit" variant="outlined" disabled={formik.errors?.length > 0}>
          Kaydet
        </Button>
      </form>
    </div>
  );
}

export default AddInternStatus;
