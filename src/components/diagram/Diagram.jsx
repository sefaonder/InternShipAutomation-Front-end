import { Box, Container, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import DiagramBox from './DiagramBox';
import PopUp from 'src/pages/Dashboard/PopUp';

const Diagram = () => {
  const diagramData = [
    { text: 'Staj Formu Oluşturuldu', description: 'staj formunu o asdsa dasdasdsa dsadas dasdasd' },
    { text: 'Staj Formu Onaylandı(Dijital)', description: 'staj formunu o asdsa dasdasdsa dsadas dasdasd' },
    { text: 'Staj Formu Resmi Belgesi Teslim Edildi', description: 'staj formunu o asdsa dasdasdsa dsadas dasdasd' },
    { text: 'Staj Mülakat Başlangıcı', description: 'staj formunu o asdsa dasdasdsa dsadas dasdasd' },
    { text: 'Staj Mülakatı Onaylandı(Dijital)', description: 'staj formunu o asdsa dasdasdsa dsadas dasdasd' },
    { text: 'Staj Mülakat Resmi Belgeler Teslim Edildi', description: 'staj formunu o asdsa dasdasdsa dsadas dasdasd' },
    { text: 'Staj Tamamlandı', description: 'staj formunu o asdsa dasdasdsa dsadas dasdasd' },
  ];
  const [description, setDescription] = useState('');
  const [open, setOpen] = useState(false);

  const handleClickOpen = (item) => {
    setDescription(item);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const status = 4;
  return (
    <Box className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] justify-items-center gap-2">
      {diagramData.map((item, index) => (
        <DiagramBox
          handleClickOpen={handleClickOpen}
          index={index + 1}
          item={item}
          success={status > index ? true : false}
        />
      ))}
      <PopUp item={description} open={open} handleClose={handleClose} />
    </Box>
  );
};

export default Diagram;
