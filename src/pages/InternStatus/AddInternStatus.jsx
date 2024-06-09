import { Alert, Button, Container, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { InternStatusEnum } from 'src/app/enums/internStatus';
import { projectSnackbar } from 'src/app/handlers/ProjectSnackbar';
import CustomEnumInput from 'src/components/inputs/CustomEnumInput';
import CustomTextInput from 'src/components/inputs/CustomTextInput';
import { useUpdateStatusMutation } from 'src/store/services/internStatus/internStatusApiSlice';
import * as yup from 'yup';

function AddInternStatus() {
  const [updateStatus, { isLoading }] = useUpdateStatusMutation();
  const navigate = useNavigate();
  const internStatusData = useSelector((state) => state.internStatus);

  const initialValues = {
    status: '',
    desc: '',
  };

  useEffect(() => {
    if (internStatusData?.id) {
      formik.setFieldValue('status', internStatusData.status, false);
    }
  }, [internStatusData]);

  const validationSchema = yup.object({
    status: yup.string().required('Lütfen Bir Staj Durumu Seçin'),
  });

  async function handleSubmit(values) {
    try {
      const payload = {
        ...values,
      };
      let response = null;
      if (internStatusData?.id) {
        response = await updateStatus({ payload: payload, internStatusId: internStatusData?.id });
      }

      if (response.data) {
        projectSnackbar(response.data.message, { variant: 'success' });
        navigate('/intern-status/' + internStatusData?.id);
      } else {
        navigate('/intern-status');
      }
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

  return (
    <Container className="flex flex-col items-center">
      <Typography className="mb-4" variant="h4">
        Staj Durumunu Güncelle
      </Typography>
      <form className="flex flex-col gap-4 w-full sm:w-2/3" onSubmit={formik.handleSubmit}>
        <Typography>{`Önceki Staj Durumu : ${InternStatusEnum[internStatusData?.status]?.label}`}</Typography>

        <CustomEnumInput
          id="status"
          name="status"
          required
          label={'Staj Durumu'}
          value={formik.values.status}
          onChange={(value) => formik.setFieldValue('status', value.target.value, true) && formik.setStatus(true)}
          enumObject={InternStatusEnum}
        />

        {/* <Alert severity="warning">
          <Typography>
            Dikkat! , Açıklama alanı girilirse yapılacak staj durumu güncellemesi kayda ait staj durumu listesine
            eklenecektir
          </Typography>
        </Alert> */}
        <CustomTextInput
          id="desc"
          name="desc"
          label="Açıklama"
          multiline
          rows={4}
          value={formik.values.desc}
          onChange={(value) => formik.setFieldValue('desc', value.target.value, true) && formik.setStatus(true)}
          error={Boolean(formik.errors.desc)}
          helperText={formik.errors.desc}
        />

        <Button type="submit" variant="outlined" disabled={formik.errors?.length > 0}>
          Kaydet
        </Button>
      </form>
    </Container>
  );
}

export default AddInternStatus;
