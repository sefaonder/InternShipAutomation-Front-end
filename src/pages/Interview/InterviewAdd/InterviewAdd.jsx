import { Typography } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetInternFormACQuery } from 'src/app/api/autocompleteSlice';
import CustomAutocomplete from 'src/components/inputs/CustomAutocomplete';

function InterviewAdd() {
  // const [createNewForm, { isLoading }] = useCreateNewFormMutation();
  const [updateStatus, { isLoading }] = useUpdateStatusMutation();
  const navigate = useNavigate();
  const interviewData = useSelector((state) => state.internStatus);

  const initialValues = {
    comission: {},
    internStatus: {},
    intern: {},
    date: '',
  };

  useEffect(() => {
    if (interviewData?.id) {
      console.log('formil', internStatusData);
      formik.setFieldValue('user', internStatusData.user.user, true);
      formik.setFieldValue('form', internStatusData.form.form, true);
      formik.setFieldValue('status', internStatusData.status, false);
    }
  }, [interviewData]);

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
    date: yup.date().required('Lütfen Mülakat Tarihi Seçin'),
  });

  async function handleSubmit(values) {
    console.log('Step1', values);
    try {
      const payload = {
        ...values,
        studentId: values.user.id,
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
    return value.name ? `${value.name} ${value.last_name}` : '';
  }

  function InternFormACLabelFunction(value) {
    return value.id ? `${value.id}` : '';
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
          name="user"
          id="user"
          useACSlice={useGetStudentACQuery}
          value={formik.values.user}
          filterOptions={filterOptions}
          onChange={(value) => formik.setFieldValue('user', value, true)}
          error={formik.touched.user && Boolean(formik.errors.user)}
          helperText={formik.touched.user && formik.errors.user}
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

        <Button type="submit" variant="outlined" disabled={formik.errors?.length > 0}>
          Kaydet
        </Button>
      </form>
    </div>
  );
}

export default InterviewAdd;
