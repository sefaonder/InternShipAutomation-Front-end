import { Alert, Box, Paper, Typography } from '@mui/material';
import React from 'react';

function WorkOnSaturdayAlert() {
  return (
    <Paper sx={{ padding: '1rem' }}>
      <Box className="flex flex-col gap-4">
        <Alert variant="outlined" severity="info">
          <Typography>
            Cumartesi günleri çalışacak öğrenciler <b>Cumartesi Çalışır Belgesini</b> teslim etmeliler
          </Typography>
        </Alert>
      </Box>
    </Paper>
  );
}

export default WorkOnSaturdayAlert;
