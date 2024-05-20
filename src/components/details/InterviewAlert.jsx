import { Alert, Box, Paper, Typography } from '@mui/material';
import React from 'react';

function InterviewAlert() {
  return (
    <Paper sx={{ padding: '1rem' }}>
      <Box className="flex flex-col gap-4">
        <Alert variant="outlined" severity="info">
          <Typography>1.Gizli Sicil Fişi</Typography>
          <Typography>2.Staj Defteri</Typography>
          <Typography>3.Öğrenci Değerlendirme Anketi</Typography>
        </Alert>
        <Alert variant="outlined" severity="warning">
          <Typography>
            Dikkat Mülakat gününe kadar öğrencilerin yukarıdaki belgeleri teslim etmesi zorunludur
          </Typography>
        </Alert>
      </Box>
    </Paper>
  );
}

export default InterviewAlert;
