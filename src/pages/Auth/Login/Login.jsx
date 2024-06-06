import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { Formik, useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useLoginMutation } from 'src/store/services/auth/authApiSlice';
import { setCredentials } from 'src/store/services/auth/authSlice';
import { Box, Link } from '@mui/material';
import parseJWT from 'src/app/handlers/jwtHandler';
import { projectSnackbar } from 'src/app/handlers/ProjectSnackbar';
import { enqueueSnackbar } from 'notistack';

function Login() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const validationSchema = yup.object({
    email: yup.string().email().required('Email alanı zorunludur'),
    password: yup.string().required('Şire alanı zorunludur'),
  });

  const setToken = async (token, role) => {
    try {
      const authObject = { token: token, roles: role };

      localStorage.setItem('user_info', JSON.stringify(authObject));
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const response = await login(values);

        if (response.data) {
          enqueueSnackbar('Başarılı bir şekilde giriş yapıldı.', { variant: 'success' });
          const parsedData = parseJWT(response.data.accessToken);
          dispatch(
            setCredentials({
              accessToken: response.data.accessToken,
              roles: parsedData.roles,
              userId: parsedData.userId,
            }),
          );
          await setToken(response.data.accessToken, parsedData.roles);
          navigate('/');
        }
      } catch (err) {
        console.log(err);
      }
    },
    validationSchema: validationSchema,
  });

  return (
    <div className="flex items-center  border-2 m-2 relative bg-white h-[32rem] rounded-xl">
      <img
        className="w-20 left-2/4 -translate-x-2/4 absolute top-[-40px]"
        src="https://uludag.edu.tr/img/uu.svg"
        alt=""
      />

      <form onSubmit={formik.handleSubmit} className="p-8 flex justify-center flex-col  gap-4 ">
        <h1 className="flex justify-center	text-2xl items-center">Bilgisayar Mühendisliği Staj Otomasyonu</h1>

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

        <Box className="flex flex-col">
          <TextField
            id="password"
            name="password"
            label="Şifre"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />{' '}
          <Link className="mt-2" component="a" href="/password-change">
            Şifremi unuttum
          </Link>
        </Box>

        <Box className="flex flex-col">
          <Button className="p-3" type="submit" color="primary" variant="outlined" disabled={isLoading}>
            Gönder
          </Button>
          <Link className="mt-2" component="a" href="/register">
            Kayıt Ol
          </Link>
        </Box>
      </form>
    </div>
  );
}

export default Login;
