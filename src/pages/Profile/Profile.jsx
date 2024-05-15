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
import { useGetProfileQuery, useUpdateProfileMutation } from 'src/store/services/profile/ProfileApiSlice';
import { Avatar, CircularProgress, Typography } from '@mui/material';
import { UserRolesEnum } from 'src/app/enums/roleList';
import usePermission from 'src/hooks/usePermission';

function Profile() {
  const [updateProfile, setUpdateProfile] = useState(false);

  const [update, { isLoading }] = useUpdateProfileMutation();
  const { data, isLoading: isLoadingData, isSuccess, refetch } = useGetProfileQuery();

  const checkPermission = usePermission();

  const isAdvancedComission = checkPermission(UserRolesEnum.COMISSION.id);

  console.log('data', data);

  useEffect(() => {
    if (data?.data) {
      console.log('data22', data.data);
      formik.setFieldValue('name', data.data.name, false);
      formik.setFieldValue('lastName', data.data.last_name, false);
      formik.setFieldValue('tcNumber', data.data.tc_number, false);
      formik.setFieldValue('schoolNumber', data.data.school_number, false);
    }
  }, [isSuccess]);

  const handleClick = () => {
    setUpdateProfile((prev) => !prev);
  };
  const validationSchema = yup.object({
    name: yup.string().required('Name is required'),
    lastName: yup.string().required('Last Name is required'),
    tcNumber: yup.string().optional('TC is required').min(11, 'TC 11 karakterden oluşmalıdır.').max(11),
    schoolNumber: yup.string().optional('School Number is optional string'),
  });
  const formik = useFormik({
    initialValues: {
      name: '',
      lastName: '',
      tcNumber: '',
      schoolNumber: '',
    },
    onSubmit: async (values) => {
      try {
        await update(values).unwrap();
        setUpdateProfile(false);
        refetch();
      } catch (err) {
        console.log(err);
      }
    },
    validationSchema: validationSchema,
  });

  if (isLoadingData) {
    return <CircularProgress />;
  }

  return (
    <Container className="flex items-center justify-center" maxWidth="sm">
      <div className="m-6  flex items-center flex-col md:w-96 justify-center">
        <Box className="flex w-full flex-col items-center">
          <Avatar src="https://uludag.edu.tr/img/uu.svg" style={{ height: '70px', width: '70px' }} alt="" />
          <Typography className="mt-2 text-lg">Bursa Uludağ Ünivesitesi</Typography>
          <Typography className="text-lg">Bilgisayar Mühendisliği</Typography>
        </Box>
        {updateProfile ? (
          <form onSubmit={formik.handleSubmit} className="p-4 flex justify-center  flex-col lg:w-[24rem]">
            <TextField
              id="name"
              name="name"
              label="İsim"
              disabled={!isAdvancedComission}
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
              disabled={!isAdvancedComission}
              margin="normal"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
            {!isAdvancedComission && (
              <TextField
                id="schoolNumber"
                name="schoolNumber"
                label="Okul Numarası"
                margin="normal"
                disabled
                inputProps={{ maxLength: 15 }}
                value={formik.values.schoolNumber}
                onChange={formik.handleChange}
                error={formik.touched.schoolNumber && Boolean(formik.errors.schoolNumber)}
                helperText={formik.touched.schoolNumber && formik.errors.schoolNumber}
              />
            )}
            <TextField
              id="tcNumber"
              name="tcNumber"
              label="Tc Kimlik"
              margin="normal"
              inputProps={{ maxLength: 11 }}
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
            {data?.data && (
              <List>
                <ListItem className="flex justify-between border-b-2">
                  <ListItemText> Adı: </ListItemText>
                  <ListItemText className="flex justify-end"> {data?.data?.name} </ListItemText>
                </ListItem>
                <ListItem className="flex justify-between  border-b-2">
                  <ListItemText> Soyadı: </ListItemText>
                  <ListItemText className="flex justify-end"> {data?.data?.last_name} </ListItemText>
                </ListItem>

                {!isAdvancedComission && (
                  <ListItem className="flex justify-between  border-b-2">
                    <ListItemText> Okul Numarası </ListItemText>
                    <ListItemText className="flex justify-end"> {data?.data?.school_number} </ListItemText>
                  </ListItem>
                )}
                <ListItem className="flex justify-between  border-b-2">
                  <ListItemText> Tc Kimlik Numarası: </ListItemText>
                  <ListItemText className="flex justify-end"> {data?.data?.tc_number} </ListItemText>
                </ListItem>
              </List>
            )}
          </Box>
        )}
        <Box className="flex w-full justify-end px-3">
          <Button
            onClick={handleClick}
            endIcon={updateProfile ? <CloseIcon /> : <PersonIcon />}
            className="p-3"
            type="submit"
            color={updateProfile ? 'error' : 'primary'}
            variant="outlined"
          >
            {updateProfile ? 'İptal Et' : 'Profili Güncelle'}
          </Button>
        </Box>
      </div>
    </Container>
  );
}

export default Profile;
