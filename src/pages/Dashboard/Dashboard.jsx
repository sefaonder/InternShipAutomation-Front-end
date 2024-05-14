import { Box, Paper, Typography } from '@mui/material';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Diagram from 'src/components/diagram/Diagram';
import { useGetProfileQuery } from 'src/store/services/profile/ProfileApiSlice';
import { setProfile } from 'src/store/services/profile/ProfileSlice';
function Dashboard() {
  const { data, isLoading, isSuccess, isError, error } = useGetProfileQuery();
  const internform = useSelector((state) => state.internForm);
  console.log(internform);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess && data.data) {
      dispatch(setProfile(data));
    }
  }, [isSuccess]);

  return (
    <div>
      <Typography variant="h2">Staj Formu</Typography>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'row-reverse',
          padding: '1rem',
          marginBottom: '1rem',
          marginTop: '1rem',
          overflowX: 'auto',
          gap: '1rem',
        }}
      ></Paper>
      <Box className="flex flex-col sm:flex-row gap-4">
        <Paper sx={{ flex: 2, padding: '1rem' }}>
          <Diagram></Diagram>
        </Paper>
        <Box className="flex flex-1 flex-col"></Box>
      </Box>
    </div>
  );
}

export default Dashboard;
