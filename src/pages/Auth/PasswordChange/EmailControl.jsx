import { Button, Link, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { usePasswordResetRequestMutation } from 'src/store/services/auth/authApiSlice';
import { projectSnackbar } from 'src/app/handlers/ProjectSnackbar';

function EmailControl({ setMailSended }) {
  const navigate = useNavigate();

  const [passwordResetRequest, { isLoading }] = usePasswordResetRequestMutation();

  const validationSchema = yup.object({
    email: yup.string().email().required('E-mail is required'),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await passwordResetRequest(values);

      if (response.data) {
        projectSnackbar(response.data.message, { variant: 'success' });
        setMailSended(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: handleSubmit,

    validationSchema: validationSchema,
  });

  return (
    <div className="flex items-center border-2 relative bg-white rounded-xl login-container h-[24rem] m-4">
      <img
        className="w-20 left-2/4 -translate-x-2/4 absolute top-[-40px]"
        src="https://uludag.edu.tr/img/uu.svg"
        alt=""
      />

      <form onSubmit={formik.handleSubmit} className="p-8 flex justify-center flex-col lg:w-[32rem] ">
        <h1 className="flex justify-center	text-2xl items-center">Bilgisayar Mühendisliği Staj Otomasyonu</h1>
        <h2 className="flex justify-center	text-2xl items-center">Şifre Sıfırlama</h2>

        <TextField
          id="email"
          name="email"
          label="E-mail"
          margin="normal"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        <Button className="p-3 mt-2" type="submit" color="primary" variant="outlined">
          Gönder
        </Button>
        <Link className="mt-2" component="a" href="/login">
          Giriş Yap
        </Link>
      </form>
    </div>
  );
}

export default EmailControl;
