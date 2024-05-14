import { Grid, IconButton, Typography } from '@mui/material';
import React from 'react';
import ErrorIcon from '@mui/icons-material/Error';
import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  //   let error = useRouteError();
  return (
    <Grid container justify="center" alignItems="center" style={{ height: '100vh' }}>
      <Grid item>
        <IconButton aria-label="Hata" size="large">
          <ErrorIcon />
        </IconButton>
        <Typography variant="h2">Sayfa Bulunamadı!</Typography>
        <Typography variant="subtitle1">Aradığınız sayfa mevcut değil veya taşınmış olabilir.</Typography>
      </Grid>
    </Grid>
  );
};

export default ErrorPage;
