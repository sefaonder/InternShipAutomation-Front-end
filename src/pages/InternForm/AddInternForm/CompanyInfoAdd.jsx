import { Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import moment from 'moment';
import CustomTextInput from 'src/components/inputs/CustomTextInput';
import { useFormik } from 'formik';
import {
  useCreateNewCompanyInfoMutation,
  useUpdateCompanyInfoMutation,
} from 'src/store/services/internForm/internFormApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

function CompanyInfoAdd({ nextStep, prevStep, internFormData, setIsLoading }) {
  const navigate = useNavigate();

  const [createNewCompanyInfo, { isLoading }] = useCreateNewCompanyInfoMutation();
  const [updateCompanyInfo, { isLoadingUpdate }] = useUpdateCompanyInfoMutation();

  const internFormId = useSelector((state) => state.internForm.id);

  const companyInfo = internFormData?.company_info;

  useEffect(() => {
    if (companyInfo?.id) {
      console.log('formil2', internFormData);
      formik.setFieldValue('name', companyInfo.name, false);
      formik.setFieldValue('address', companyInfo.address, false);
      formik.setFieldValue('phone', companyInfo.phone, false);
      formik.setFieldValue('fax', companyInfo.fax, false);
      formik.setFieldValue('email', companyInfo.email, false);
      formik.setFieldValue('serviceArea', companyInfo.service_area, false);
    }
  }, [internFormData]);

  const initialValues = {
    name: '',
    address: '',
    phone: '',
    fax: '',
    email: '',
    serviceArea: '',
  };

  const validationSchema = yup.object({
    name: yup
      .string()
      .required('Lütfen firma ismi girin')
      .min(3, 'Firma adı en az 3 karakter olabilir')
      .max(50, 'Firma adı en fazla 50 karakter olabilir'),
    address: yup
      .string()
      .required('Lütfen adres girin')
      .min(3, 'Firma adı en az 3 karakter olabilir')
      .max(50, 'firma adresi en fazla 50 karakter olabilir'),
    phone: yup.string().required('Lütfen geçerli bir telefon girin'),
    fax: yup
      .string()
      .required('Lütfen geçerli bir fax girin')
      .min(3, 'Fax en az 3 karakter olabilir')
      .max(50, 'fax en fazla 50 karakter olabilir'),
    email: yup
      .string()
      .required('Lütfen geçerli bir email adresi girin')
      .min(3, 'Firma Maili en az 3 karakter olabilir')
      .max(50, 'Firma Maili en fazla 50 karakter olabilir'),
    serviceArea: yup
      .string()
      .required('Lütfen hizmet alanı girin')
      .min(3, 'Firma Servis Alanı en az 3 karakter olabilir')
      .max(50, 'Firma Servis Alanı en fazla 50 karakter olabilir'),
  });

  async function handleSubmit(values) {
    setIsLoading(true);
    try {
      const payload = { ...values, internFormId: internFormId };
      let response = null;
      if (companyInfo?.id) {
        if (formik.status) {
          response = await updateCompanyInfo({ payload: payload, companyInfoId: companyInfo.id }).unwrap();
        }
      } else {
        response = await createNewCompanyInfo(payload).unwrap();
      }
      console.log(response);

      setIsLoading(false);
      navigate('/intern-form/' + internFormId);
    } catch (error) {
      console.log('err', error);
      setIsLoading(false);
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
        3.Adım Şirket Bilgileri
      </Typography>
      <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
        <CustomTextInput
          id="name"
          name="name"
          label="Firma ismi"
          value={formik.values.name}
          onChange={(value) => formik.setFieldValue('name', value.target.value, true) && formik.setStatus(true)}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />

        <CustomTextInput
          id="address"
          name="address"
          label="Firma Adresi"
          value={formik.values.address}
          onChange={(value) => formik.setFieldValue('address', value.target.value, true) && formik.setStatus(true)}
          error={formik.touched.address && Boolean(formik.errors.address)}
          helperText={formik.touched.address && formik.errors.address}
        />

        <CustomTextInput
          id="phone"
          name="phone"
          label="Firma Telefon Numarası"
          value={formik.values.phone}
          onChange={(value) => formik.setFieldValue('phone', value.target.value, true) && formik.setStatus(true)}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
        />

        <CustomTextInput
          id="fax"
          name="fax"
          label="Firma Fax Numarası"
          value={formik.values.fax}
          onChange={(value) => formik.setFieldValue('fax', value.target.value, true) && formik.setStatus(true)}
          error={formik.touched.fax && Boolean(formik.errors.fax)}
          helperText={formik.touched.fax && formik.errors.fax}
        />

        <CustomTextInput
          id="email"
          name="email"
          label="Firma Email"
          value={formik.values.email}
          onChange={(value) => formik.setFieldValue('email', value.target.value, true) && formik.setStatus(true)}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        <CustomTextInput
          id="serviceArea"
          name="serviceArea"
          label="Firma Hizmet Alanı"
          value={formik.values.serviceArea}
          onChange={(value) => formik.setFieldValue('serviceArea', value.target.value, true) && formik.setStatus(true)}
          error={formik.touched.serviceArea && Boolean(formik.errors.serviceArea)}
          helperText={formik.touched.serviceArea && formik.errors.serviceArea}
        />

        <Button type="submit" variant="outlined" disabled={!formik.isValid}>
          ilerle
        </Button>
      </form>
    </div>
  );
}

export default CompanyInfoAdd;
