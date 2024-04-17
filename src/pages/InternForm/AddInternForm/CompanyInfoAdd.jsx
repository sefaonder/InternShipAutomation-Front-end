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
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

function CompanyInfoAdd({ nextStep, prevStep, internFormData }) {
  const [data, setData] = useState('');

  const navigate = useNavigate();

  const [createNewCompanyInfo, { isLoading }] = useCreateNewCompanyInfoMutation();
  const [updateCompanyInfo, { isLoadingUpdate }] = useUpdateCompanyInfoMutation();

  const internFormId = useSelector((state) => state.internForm.id);

  const companyInfo = internFormData?.company_info?.company_info;

  const handleNext = () => {
    // Adım 2 verileri işle
    console.log('Adım 2 verisi:', data);
    // Sonraki adıma git
    nextStep();
  };

  const handleBack = () => {
    // Önceki adıma git
    prevStep();
  };

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
    name: yup.string().required('Lütfen firma ismi girin'),
    address: yup.string().required('Lütfen adres girin'),
    phone: yup.string().required('Lütfen geçerli bir telefon girin'),
    fax: yup.string().required('Lütfen geçerli bir fax girin'),
    email: yup.string().required('Lütfen geçerli bir email adresi girin'),
    serviceArea: yup.string().required('Lütfen hizmet alanı girin'),
  });

  async function handleSubmit(values) {
    console.log('Step3', values);
    try {
      const payload = { ...values, internFormId: internFormId };
      let response = null;
      if (companyInfo?.id) {
        response = await updateCompanyInfo({ payload: payload, companyInfoId: companyInfo.id }).unwrap();
      } else {
        response = await createNewCompanyInfo(payload).unwrap();
      }
      console.log(response);

      navigate('/intern-form/' + internFormId);
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
      <Typography variant="h6">Adım 2</Typography>
      <form className="flex flex-col" onSubmit={formik.handleSubmit}>
        <CustomTextInput
          id="name"
          name="name"
          label="Firma ismi"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />

        <CustomTextInput
          id="address"
          name="address"
          label="Firma Adresi"
          value={formik.values.address}
          onChange={formik.handleChange}
          error={formik.touched.address && Boolean(formik.errors.address)}
          helperText={formik.touched.address && formik.errors.address}
        />

        <CustomTextInput
          id="phone"
          name="phone"
          label="Firma Telefon Numarası"
          value={formik.values.phone}
          onChange={formik.handleChange}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
        />

        <CustomTextInput
          id="fax"
          name="fax"
          label="Firma Fax Numarası"
          value={formik.values.fax}
          onChange={formik.handleChange}
          error={formik.touched.fax && Boolean(formik.errors.fax)}
          helperText={formik.touched.fax && formik.errors.fax}
        />

        <CustomTextInput
          id="email"
          name="email"
          label="Firma Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        <CustomTextInput
          id="serviceArea"
          name="serviceArea"
          label="Firma Hizmet Alanı"
          value={formik.values.serviceArea}
          onChange={formik.handleChange}
          error={formik.touched.serviceArea && Boolean(formik.errors.serviceArea)}
          helperText={formik.touched.serviceArea && formik.errors.serviceArea}
        />

        <Button type="submit" variant="outlined" disabled={formik.errors?.length > 0}>
          ilerle
        </Button>
      </form>
      <Button variant="outlined" onClick={handleBack}>
        Geri
      </Button>
      <Button variant="outlined" onClick={handleNext}>
        Sonraki
      </Button>
    </div>
  );
}

export default CompanyInfoAdd;
