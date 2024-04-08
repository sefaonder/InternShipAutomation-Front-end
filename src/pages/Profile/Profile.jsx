import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Formik, useFormik } from 'formik';
import * as yup from 'yup';
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from '@mui/icons-material/Close';
import Container from '@mui/material/Container';
import { useUpdateProfileMutation } from 'src/store/services/profile/ProfileApiSlice';

function Profile() {
  const profile = useSelector((state) => state.profile);
  const [user, setUser] = useState();
  const [updateProfile, setUpdateProfile] = useState(false);
  const [update, { isLoading }] = useUpdateProfileMutation();

  useEffect(() => {
    setUser(JSON.parse(profile.user));
  }, [profile]);

  useEffect(() => {
    formik.initialValues.name = user?.name;
    formik.initialValues.lastName = user?.lastName;
    formik.initialValues.tcNumber = user?.tcNumber;
  }, [user]);

  const handleClick = () => {
    setUpdateProfile((prev) => !prev);
  };
  const validationSchema = yup.object({
    name: yup.string().required('Name is required'),
    lastName: yup.string().required('Last Name is required'),
    tcNumber: yup.string().required('TC is required'),
  });
  const formik = useFormik({
    initialValues: {
      name: '',
      lastName: '',
      tcNumber: '',
    },
    onSubmit: async (values) => {
      try {
        const userData = await update(values).unwrap();
      } catch (err) {}
    },
    validationSchema: validationSchema,
  });

  return (
    <Container maxWidth="sm">
      <div className="m-6  flex items-center flex-col md:w-96 justify-center">
        <img src="https://uludag.edu.tr/img/uu.svg" className="w-20 " alt="" />
        {updateProfile ? (
          <form onSubmit={formik.handleSubmit} className="p-4 flex justify-center flex-col lg:w-[24rem] ">
            <TextField
              id="name"
              name="name"
              label="İsim"
              margin="normal"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              id="lastName"
              name="lastName"
              label="Soyisim"
              margin="normal"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
            <TextField
              id="tcNumber"
              name="tcNumber"
              label="Tc Kimlik"
              margin="normal"
              value={formik.values.tcNumber}
              onChange={formik.handleChange}
              error={formik.touched.tcNumber && Boolean(formik.errors.tcNumber)}
              helperText={formik.touched.tcNumber && formik.errors.tcNumber}
            />
            <Button className="p-3" type="submit" color="primary" variant="outlined">
              Gönder
            </Button>
          </form>
        ) : (
          <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <List>
              {user &&
                Object.keys(user).map((key) => (
                  <ListItem key={key} className="flex justify-between">
                    <ListItemText> {key} </ListItemText>
                    <ListItemText className="flex justify-end"> {user[key]} </ListItemText>
                  </ListItem>
                ))}
            </List>
          </Box>
        )}
        <Button
          onClick={handleClick}
          endIcon={updateProfile ? <CloseIcon /> : <PersonIcon />}
          className="p-3"
          type="submit"
          color="success"
          variant="outlined"
        >
          {updateProfile ? 'İptal Et' : 'Profili Güncelle'}
        </Button>
      </div>
    </Container>
  );
}

export default Profile;
