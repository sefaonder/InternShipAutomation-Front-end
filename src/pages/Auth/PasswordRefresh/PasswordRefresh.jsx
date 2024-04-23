import { useFormik } from 'formik';
import * as yup from 'yup';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { usePasswordResetMutation } from 'src/store/services/auth/authApiSlice';
import { Button, TextField } from '@mui/material';

function PasswordRefresh() {
  const navigate = useNavigate();

  const { token } = useParams(); // URL'den token parametresini alıyoruz
  const [resetToken, setResetToken] = useState(null);
  const [passwordReset, { isLoading }] = usePasswordResetMutation();

  console.log('resetToken', resetToken);

  useEffect(() => {
    // Token'i bir değişkende saklıyoruz
    if (token) {
      sessionStorage.setItem('reset-token', token);
    }

    navigate('/password-reset');

    // Bu sayede URL'deki token parametresi kaldırılmış olacak.
  }, [token]);

  const validationSchema = yup.object({
    password: yup.string().required('Password is required'),
    password2: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Şifreler eşleşmiyor')
      .required('Password2 is required'),
  });

  const handleSubmit = async (values) => {
    const pwdResetToken = sessionStorage.getItem('reset-token');
    const payload = { credentials: values, token: pwdResetToken };
    const response = await passwordReset(payload);

    if (response) {
      sessionStorage.removeItem('reset-token');
      console.log('password succesfully changed');
      navigate('/login');
    }
  };

  const formik = useFormik({
    initialValues: {
      password: '',
      password2: '',
    },
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
  });

  console.log('formik', formik.values);

  return (
    <div className="flex items-center border-2 relative login-container h-[32rem]">
      <img
        className="w-20 left-2/4 -translate-x-2/4 absolute top-[-40px]"
        src="https://uludag.edu.tr/img/uu.svg"
        alt=""
      />

      <form onSubmit={formik.handleSubmit} className="p-8 flex justify-center flex-col lg:w-[32rem] mt-12">
        <h1 className="flex justify-center	text-2xl items-center">Bilgisayar Mühendisliği Staj Otomasyonu</h1>

        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
          margin="normal"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />

        <TextField
          id="password2"
          name="password2"
          label="Password2"
          type="password"
          margin="normal"
          value={formik.values.password2}
          onChange={formik.handleChange}
          error={formik.touched.password2 && Boolean(formik.errors.password2)}
          helperText={formik.touched.password2 && formik.errors.password2}
        />
        <Button className="p-3" type="submit" color="primary" variant="outlined">
          Gönder
        </Button>
      </form>
    </div>
  );
}

export default PasswordRefresh;
