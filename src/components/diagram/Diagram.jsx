import { Box, Container, Paper, Typography } from '@mui/material';
import React from 'react';
import DiagramBox from './DiagramBox';
const Diagram = () => {
  const diagramData = [
    { text: 'Staj Formu Oluşturuldu' },
    { text: 'Staj Formu Onaylandı(Dijital)' },
    { text: 'Staj Formu Resmi Belgesi Teslim Edildi' },
    { text: 'Staj Mülakat Başlangıcı' },
    { text: 'Staj Mülakatı Onaylandı(Dijital)' },
    { text: 'Staj Mülakat Resmi Belgeler Teslim Edildi' },
    { text: 'Staj Tamamlandı' },
  ];
  const status = 4;
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
          <Box className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
            {diagramData.map((item, index) => (
              <DiagramBox index={index + 1} text={item.text} success={status > index ? true : false} />
            ))}
          </Box>
        </Paper>
        <Box className="flex flex-1 flex-col">{/* <RecordTraceCard record={internFormData} /> */}</Box>
      </Box>
    </div>
  );
};

export default Diagram;
