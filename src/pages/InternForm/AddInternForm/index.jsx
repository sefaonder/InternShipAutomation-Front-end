import { List, ListItem, ListItemText, Paper } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import React, { useState } from 'react';
import { useGetStudentACQuery } from 'src/app/api/autocompleteSlice';
import StudentACList from 'src/components/ACLists/StudentACList';
import CustomAutocomplete from 'src/components/inputs/CustomAutocomplete';
import CustomDateInput from 'src/components/inputs/CustomDateInput';
import CustomTextInput from 'src/components/inputs/CustomTextInput';

function InternFormAdd() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [text, setText] = useState('');
  const [studentId, setStudentId] = useState({
    id: '42885165-5554-4de7-ac79-67161bee1c4',
    name: 'sefa',
    last_name: 'önder',
    school_number: '032090003',
  });
  console.log('studentId', studentId);

  const validationSchema = yup.object({
    studentId: yup.string().email().required('E-mail is required'),
    startDate: yup.string().required('Password is required'),
    endDate: yup.date(),
    eduYear: yup.string(),
  });

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

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const filterOptions = (options, { inputValue }) => {
    return options.filter((option) => {
      // Arama metniyle eşleşen seçenekleri filtrele
      const searchText = inputValue.toLowerCase();
      const { last_name, name, school_number } = option;
      return (
        last_name.toLowerCase().includes(searchText) ||
        name.toLowerCase().includes(searchText) ||
        school_number.toLowerCase().includes(searchText)
      );
    });
  };

  return (
    <Paper>
      <form onSubmit={formik.handleSubmit}>
        <CustomDateInput value={selectedDate} onChange={handleDateChange} />
        <CustomTextInput value={text} onChange={handleTextChange} label="bir input" error="static" />
        <CustomAutocomplete
          useACSlice={useGetStudentACQuery}
          value={studentId}
          filterOptions={filterOptions}
          onChange={(e) => setStudentId(e)}
          field={'name'}
          renderOption={(props, option) => (
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              <ListItem
                key={option.school_number}
                {...props}
                disablePadding
                button
                // style={{ borderBottom: `1px solid ${theme.palette.divider}` }}
              >
                <ListItemText primary={option?.name + ' ' + option?.last_name} secondary={option?.school_number} />
              </ListItem>
            </List>
          )}
        />
      </form>
    </Paper>
  );
}

export default InternFormAdd;
