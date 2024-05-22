import { useFormik } from 'formik';
import React from 'react';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import CustomTextInput from 'src/components/inputs/CustomTextInput';
import { useRegisterMutation } from 'src/store/services/auth/authApiSlice';
import { Box, Button, Link } from '@mui/material';

function Register() {
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const emailRegex = /^[0-9]{9}@ogr\.uludag\.edu\.tr$/;

  const validationSchema = yup.object({
    email: yup.string().matches(emailRegex, 'Geçersiz e-posta formatı').required('E-posta zorunludur'),
    lastName: yup.string().required('Last Name is required'),
    name: yup.string().required('name is required'),
    tcNumber: yup.string().required('TC number req'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      lastName: '',
      email: '',
      tcNumber: '',
    },
    onSubmit: async (values) => {
      try {
        const userData = await register({ ...values, last_name: values.lastName }).unwrap();
        // TODO: response snackbar
        navigate('/login');
      } catch (err) {
        console.log('err', err);
      }
    },
    validationSchema: validationSchema,
  });

  return (
    <div className="flex items-center  border-2 m-2 relative bg-white h-[36rem] rounded-xl">
      <img
        className="w-20 left-2/4 -translate-x-2/4 absolute top-[-40px]"
        src="https://uludag.edu.tr/img/uu.svg"
        alt=""
      />

      <form onSubmit={formik.handleSubmit} className="p-8 flex justify-center flex-col gap-4">
        <h1 className="flex justify-center	text-2xl items-center">Bilgisayar Mühendisliği Staj Otomasyonu</h1>

        <CustomTextInput
          id="name"
          name="name"
          label="İsim"
          required
          value={formik.values.name}
          onChange={formik.handleChange}
          error={Boolean(formik.errors.name)}
          helperText={formik.errors.name}
        />

        <CustomTextInput
          id="lastName"
          name="lastName"
          label="Soy İsim"
          required
          value={formik.values.lastName}
          onChange={formik.handleChange}
          error={Boolean(formik.errors.lastName)}
          helperText={formik.errors.lastName}
        />

        <CustomTextInput
          id="email"
          name="email"
          required
          label="Öğrenci mail adresi"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={Boolean(formik.errors.email)}
          helperText={formik.errors.email}
        />

        <CustomTextInput
          id="tcNumber"
          name="tcNumber"
          required
          label="T.C Kimlik Numarası"
          value={formik.values.tcNumber}
          onChange={formik.handleChange}
          error={Boolean(formik.errors.tcNumber)}
          helperText={formik.errors.tcNumber}
        />
        <Box className="flex flex-col">
          <Button className="p-3" type="submit" color="primary" variant="outlined">
            Üye Ol
          </Button>

          <Link component="a" href="/login">
            Giriş Yap
          </Link>
        </Box>
      </form>
    </div>
  );
}

export default Register;
