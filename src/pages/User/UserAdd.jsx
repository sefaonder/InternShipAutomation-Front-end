import { Box, Button, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAddUserMutation, useUpdateUserMutation } from 'src/store/services/user/userApiSlice';
import { UserRolesEnum } from 'src/app/enums/roleList';
import CustomTextInput from 'src/components/inputs/CustomTextInput';
import CustomEnumInput from 'src/components/inputs/CustomEnumInput';
import { useDispatch, useSelector } from 'react-redux';
import CustomBooleanInput from 'src/components/inputs/CustomBooleanInput';
import CustomDateInput from 'src/components/inputs/CustomDateInput';
import dayjs from 'dayjs';

import { clearUserData } from 'src/store/services/user/userSlice';

function UserAdd() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [addUser, { isLoading }] = useAddUserMutation();
  const [updateUser, { isLoadingUpdate }] = useUpdateUserMutation();

  const userData = useSelector((state) => state.user);
  const { userId } = useParams();

  useEffect(() => {
    if (userId && !Boolean(userData?.id)) {
      // navigate back detail page
      navigate('/user/' + userId);
    }

    if (!userId) {
      dispatch(clearUserData());
    }
  }, []);

  useEffect(() => {
    if (userData?.id) {
      console.log('formil', userData);
      formik.setFieldValue('name', userData.name, false);
      formik.setFieldValue('lastName', userData.last_name, false);
      formik.setFieldValue('email', userData.email, false);
      formik.setFieldValue('userType', userData.user_type, false);

      formik.setFieldValue('schoolNumber', userData.school_number, false);
      formik.setFieldValue('tcNumber', userData.tc_number, false);

      formik.setFieldValue('graduationDate', userData.graduationDate, false);
      formik.setFieldValue('isGraduate', userData.isGraduate, false);
    }
  }, [userData]);

  const initialValues = {
    email: '',
    userType: '',
    name: '',
    lastName: '',
    schoolNumber: '',
    tcNumber: '',
  };

  const validationSchema = yup.object({
    name: yup.string().required('Lütfen Kullanıcı ismi girin'),
    lastName: yup.string().required('Lütfen Kullanıcı soyismi girin'),
    email: yup.string().email().required('Lütfen geçerli üniversite mail hesabını girin'),
    userType: yup.string().required('Lütfen kullanıcının yetkisini girin'),

    schoolNumber: yup.string().optional('').nullable(),
    tcNumber: yup.string().optional('').nullable(),

    isGraduate: yup.boolean().optional('').nullable(),
    graduationDate: yup.date().optional('').nullable(),
  });

  async function handleSubmit(values) {
    try {
      const payload = {
        ...values,
      };
      let response = null;
      if (userData?.id) {
        response = await updateUser({ payload: payload, userId: userData?.id });
      } else {
        response = await addUser(payload);
      }
      console.log('response', response);
    } catch (error) {
      console.log(error);
    } finally {
      if (userData?.id) {
        navigate('/user/' + userData?.id);
      } else {
        navigate('/user');
      }
    }
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
  });

  useEffect(() => {
    if (formik.values.schoolNumber && formik.values.userType === UserRolesEnum.STUDENT.id) {
      formik.setFieldValue('email', formik.values.schoolNumber + '@ogr.uludag.edu.tr', false);
    }
  }, [formik.values.schoolNumber]);

  console.log('formik', formik.values);

  return (
    <div>
      <Typography variant="h6">Kullanıcı</Typography>
      <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
        <CustomTextInput
          id="name"
          name="name"
          label="İsim"
          required
          value={formik.values.name}
          onChange={(value) => formik.setFieldValue('name', value.target.value, true) && formik.setStatus(true)}
          error={Boolean(formik.errors.name)}
          helperText={formik.errors.name}
        />

        <CustomTextInput
          id="lastName"
          name="lastName"
          label="Soyisim"
          required
          value={formik.values.lastName}
          onChange={(value) => formik.setFieldValue('lastName', value.target.value, true) && formik.setStatus(true)}
          error={Boolean(formik.errors.lastName)}
          helperText={formik.errors.lastName}
        />

        <CustomEnumInput
          id="userType"
          name="userType"
          required
          label={'Kullanıcının Yetkisi'}
          value={formik.values.userType}
          onChange={(value) => formik.setFieldValue('userType', value.target.value, true) && formik.setStatus(true)}
          enumObject={UserRolesEnum}
          error={Boolean(formik.errors.userType)}
          helperText={formik.errors.userType}
        />

        {formik.values.userType === UserRolesEnum.STUDENT.id && (
          <CustomTextInput
            id="schoolNumber"
            name="schoolNumber"
            label="Okul Numarası"
            value={formik.values.schoolNumber}
            onChange={(value) =>
              formik.setFieldValue('schoolNumber', value.target.value, true) && formik.setStatus(true)
            }
            error={Boolean(formik.errors.schoolNumber)}
            helperText={formik.errors.schoolNumber}
          />
        )}

        <CustomTextInput
          id="tcNumber"
          name="tcNumber"
          label="T.C Kimlik Numarası"
          value={formik.values.tcNumber}
          onChange={(value) => formik.setFieldValue('tcNumber', value.target.value, true) && formik.setStatus(true)}
          error={Boolean(formik.errors.tcNumber)}
          helperText={formik.errors.tcNumber}
        />

        <CustomTextInput
          id="email"
          name="email"
          disabled={userData?.id}
          label="Universite mail adresi"
          required
          value={formik.values.email}
          onChange={(value) => formik.setFieldValue('email', value.target.value, true) && formik.setStatus(true)}
          error={Boolean(formik.errors.email)}
          helperText={formik.errors.email}
        />

        {userData.id && formik.values.userType === UserRolesEnum.STUDENT.id && (
          <Box className="flex flex-row justify-evenly">
            <CustomBooleanInput
              name="isGraduate"
              id="isGraduate"
              label="Mezuniyet Durumu"
              value={formik.values.isGraduate}
              onChange={(value) => formik.setFieldValue('isGraduate', value, true) && formik.setStatus(true)}
            />

            <CustomDateInput
              id="graduationDate"
              name="graduationDate"
              required
              label="Mezuniyet Tarihi"
              value={dayjs(formik.values.graduationDate)}
              onChange={(value) => formik.setFieldValue('graduationDate', value ? dayjs(value).toDate() : null, true)}
              error={Boolean(formik.errors.graduationDate)}
              helperText={formik.errors.graduationDate}
            />
          </Box>
        )}

        <Button type="submit" variant="outlined" disabled={!formik.isValid}>
          Kaydet
        </Button>
      </form>
    </div>
  );
}

export default UserAdd;
