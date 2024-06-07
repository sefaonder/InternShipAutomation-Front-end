import { Box, Typography } from '@mui/material';
import React from 'react';

const HeaderTitle = () => {
  return (
    <Box className="flex flex-col text-xs">
      <Typography className="flex flex-col text-xs">B.U.Ü. Bilgisayar Mühendisliği</Typography>
      <Typography className="flex flex-col text-xs">Staj Otomasyonu</Typography>
    </Box>
  );
};

export default HeaderTitle;
