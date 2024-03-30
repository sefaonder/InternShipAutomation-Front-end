import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from 'src/store/services/auth/authSlice';
import { useLoginMutation } from 'src/store/services/auth/authApiSlice';

import { Formik } from 'formik';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useSnackbar } from 'notistack';

function Login() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [form, setForm] = useState({ email: null, password: null });
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  // useEffect(() => {
  // focus email input
  // }, [])

  // useEffect(() => {
  // set error messages
  // }, [form])

  //  TODO: if user already sign in have a accesToken then this user should be redirect to dashboard

  return (
    <div className="flex justify-center flex-col">
      <h1>Anywhere in your app!</h1>
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const userData = await login({ email: values.email, password: values.password }).unwrap();
            console.log('hebili', userData);
            dispatch(setCredentials({ ...userData, email: values.email }));
            setSubmitting(true);
            setForm({ email: '', password: '' });
            navigate('/');
          } catch (error) {
            // adding error management
            console.log(error, 'error');
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit} className="flex justify-center flex-col w-56">
            <TextField type="email" name="email" onChange={handleChange} onBlur={handleBlur} value={values.email} />
            {errors.email && touched.email && errors.email}
            <TextField
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && errors.password}
            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
