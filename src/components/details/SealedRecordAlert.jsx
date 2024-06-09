import { Alert, AlertTitle, Box, Paper, Typography } from '@mui/material';
import React from 'react';

function SealedRecordAlert() {
  return (
    <Paper sx={{ padding: '0.5rem', marginBottom: '1rem' }}>
      <Alert variant="outlined" severity="warning" color="warning">
        <AlertTitle>Dikkat!</AlertTitle>

        <Typography>
          Bu kayıt <b>Mühürlüdür</b> Öğrenciler kayıt üzerinde güncelleme yapamazlar.
        </Typography>
      </Alert>
    </Paper>
  );
}

export default SealedRecordAlert;
