import { Box, Grid, IconButton, Typography } from '@mui/material';
import React from 'react';
import ErrorIcon from '@mui/icons-material/Error';
import { useRouteError } from 'react-router-dom';

function NotValidToken() {
  return (
    <div className="flex items-center flex-col bg-white rounded-xl justify-center border-2 m-2 relative login-container h-[20rem] lg:p-8">
      <img
        className="w-20 left-2/4 -translate-x-2/4 absolute top-[-40px]"
        src="https://uludag.edu.tr/img/uu.svg"
        alt=""
      />
      <Box className="flex items-center gap-4">
        <ErrorIcon className="text-red-600 text-xxl text-4xl" />
        <Typography variant="h2"> Oturum süresi dolmuştur!</Typography>
      </Box>

      <div className="p-2 text-lg">
        Bir hata olduğunu düşünüyorsanız lütfen staj@otomasyon.mail adresine mail atınız
      </div>
    </div>
  );
}

export default NotValidToken;
