import { Button, CircularProgress } from '@mui/material';
import React from 'react';
import DownloadIcon from '@mui/icons-material/Download';
const DownloadButton = ({ variant, submitForm, loadingDownload, text = false }) => {
  return (
    <Button
      onClick={(e) => submitForm(e)}
      color="success"
      variant={variant}
      startIcon={!loadingDownload ? <CircularProgress /> : <DownloadIcon />}
    >
      {!loadingDownload ? 'PDF Hazırlanıyor' : !text ? 'PDF Olarak İndir' : 'Cumartesi Çalışır Belgesi İndir'}
    </Button>
  );
};

export default DownloadButton;
