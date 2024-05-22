import { Alert, Button, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { InternStatusEnum } from 'src/app/enums/internStatus';
import CustomEnumInput from 'src/components/inputs/CustomEnumInput';
import CustomTextInput from 'src/components/inputs/CustomTextInput';
import { useUpdateStatusMutation } from 'src/store/services/internStatus/internStatusApiSlice';
import * as yup from 'yup';

function AddInternStatus() {
  // const [createNewForm, { isLoading }] = useCreateNewFormMutation();
  const [updateStatus, { isLoading }] = useUpdateStatusMutation();
  const navigate = useNavigate();
  const internStatusData = useSelector((state) => state.internStatus);

  const initialValues = {
    status: '',
    desc: '',
  };

  useEffect(() => {
    if (internStatusData?.id) {
      console.log('formil', internStatusData);
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
      };
      let response = null;
      if (internStatusData?.id) {
        response = await updateStatus({ payload: payload, internStatusId: internStatusData?.id });
      } else {
        console.log('hii');
      }
      console.log(response);
      console.log('oops something bad req');
    } catch (error) {
      console.log(error);
    } finally {
      navigate('/intern-status/' + internStatusData?.id);
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
      <Typography className="mb-4" variant="h4">
        Staj Durmu Güncelle
      </Typography>
      <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
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

        <Alert severity="warning">
          <Typography>
            Dikkat! , Açıklama alanı girilirse yapılacak staj durumu güncellemesi kayda ait staj durumu listesine
            eklenecektir
          </Typography>
        </Alert>
        <CustomTextInput
          id="desc"
          name="desc"
          label="Açıklama"
          value={formik.values.desc}
          onChange={(value) => formik.setFieldValue('desc', value.target.value, true) && formik.setStatus(true)}
          error={Boolean(formik.errors.desc)}
          helperText={formik.errors.desc}
        />

        <Button type="submit" variant="outlined" disabled={formik.errors?.length > 0}>
          Kaydet
        </Button>
      </form>
    </div>
  );
}

export default AddInternStatus;
