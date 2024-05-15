import { Box, Paper, Stack, Typography } from '@mui/material';
import moment from 'moment';
import React from 'react';

function RecordTraceCard({ record }) {
  return (
    <Paper sx={{ flex: 1, padding: '1rem', maxHeight: '20rem' }}>
      <Stack spacing={2}>
        <Box className="flex flex-col gap-2">
          <Typography variant="h5">Kayıt Oluşturulma Tarihi</Typography>
          <Typography>{moment(record.createdAt).format('DD.MM.YYYY HH:mm:ss')}</Typography>
        </Box>
        <Box className="flex flex-col gap-2">
          <Typography variant="h5">Kaydı oluşturan kişi</Typography>
          <Typography>{record.createdBy?.name + ' ' + record.createdBy?.last_name}</Typography>
        </Box>

        <Box className="flex flex-col gap-2">
          <Typography variant="h5">Son Güncelleme Tarihi</Typography>
          {record.updatedAt && <Typography>{moment(record.updatedAt).format('DD.MM.YYYY HH:mm:ss')}</Typography>}
        </Box>
        <Box className="flex flex-col gap-2">
          <Typography variant="h5">Son Güncelleyen kişi</Typography>
          {record.updatedBy && <Typography>{record.updatedBy.name + ' ' + record.updatedBy.last_name}</Typography>}
        </Box>
      </Stack>
    </Paper>
  );
}

export default RecordTraceCard;
