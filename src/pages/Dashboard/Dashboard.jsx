import { Box, Paper, Typography } from '@mui/material';

import { useDispatch } from 'react-redux';
import { UserRolesEnum } from 'src/app/enums/roleList';
import Diagram from 'src/components/diagram/Diagram';
import usePermission from 'src/hooks/usePermission';

function Dashboard() {
  const dispatch = useDispatch();

  const checkPermission = usePermission();

  const isAdvancedComission = checkPermission(UserRolesEnum.COMISSION.id);
  const isAdvancedAdmin = checkPermission(UserRolesEnum.ADMIN.id);

  return (
    <div>
      <Typography variant="h2">Bursa Uludağ Üniversitesi Bilgisayar Mühendisliği Staj Otomasyonu</Typography>
      <Paper
        sx={{
          display: 'flex',
          padding: '1rem',
          marginBottom: '1rem',
          marginTop: '1rem',
          overflowX: 'auto',
          gap: '1rem',
        }}
      >
        Bilgilendirme yazısı
      </Paper>
      <Box className="flex flex-col sm:flex-row gap-4">
        {!isAdvancedComission && (
          <Paper sx={{ flex: 2, padding: '1rem' }}>
            <Diagram />
          </Paper>
        )}
        <Box className="flex flex-1 flex-col"></Box>
      </Box>
    </div>
  );
}

export default Dashboard;
