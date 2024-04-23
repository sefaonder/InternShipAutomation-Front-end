import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { Formik, useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useLoginMutation } from 'src/store/services/auth/authApiSlice';
import './login.css';
import { setCredentials } from 'src/store/services/auth/authSlice';
import { Link } from '@mui/material';

function Login() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const validationSchema = yup.object({
    email: yup.string().email().required('E-mail is required'),
    password: yup.string().required('Password is required'),
  });

  const setToken = async (userData) => {
    try {
      const authObject = { roles: userData.roles, token: userData.accessToken };
      localStorage.setItem('token', JSON.stringify(authObject));
    } catch (err) {
      // TODO: snackbar error and navigate to login
      console.log('Error occurred while fetching user data:', err);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const userData = await login(values).unwrap();
        dispatch(setCredentials(userData));
        await setToken(userData);
        navigate('/');
      } catch (err) {
        if (!err?.originalStatus) {
          // isLoading: true until timeout occurs
          //setErrMsg('No Server Response');
        } else if (err.originalStatus === 400) {
          //setErrMsg('Missing Username or Password');
        } else if (err.originalStatus === 401) {
          //setErrMsg('Unauthorized');
        } else {
          //setErrMsg('Login Failed');
        }
      }
    },
    validationSchema: validationSchema,
  });

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
          id="email"
          name="email"
          label="E-mail"
          margin="normal"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
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
        <Button className="p-3" type="submit" color="primary" variant="outlined">
          Gönder
        </Button>

        <Link component="a" href="/password-change">
          Şifremi unuttum
        </Link>
      </form>
    </div>
  );
}

export default Login;
