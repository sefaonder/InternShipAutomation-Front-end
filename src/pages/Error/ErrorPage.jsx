import { Box, Grid, IconButton, Typography } from '@mui/material';
import React from 'react';
import ErrorIcon from '@mui/icons-material/Error';
import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  //   let error = useRouteError();
  return (
    <div className="flex items-center flex-col bg-white rounded-xl justify-center border-2 m-2 relative login-container h-[20rem] lg:p-8 px-4">
      <img
        className="w-20 left-2/4 -translate-x-2/4 absolute top-[-40px]"
        src="https://uludag.edu.tr/img/uu.svg"
        alt=""
      />
      <Box className="flex items-center gap-4">
        <ErrorIcon className="text-red-600 text-xxl text-4xl" />
        <Typography variant="h2">Sayfa Bulunamadı!</Typography>
      </Box>

      <Typography variant="subtitle1">Aradığınız sayfa mevcut değil veya taşınmış olabilir.</Typography>
    </div>
  );
};

export default ErrorPage;
