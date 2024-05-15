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
    <Box className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] justify-items-center gap-2">
      {diagramData.map((item, index) => (
        <DiagramBox index={index + 1} text={item.text} success={status > index ? true : false} />
      ))}
    </Box>
  );
};

export default Diagram;
