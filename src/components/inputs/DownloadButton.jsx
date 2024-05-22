import { Button, CircularProgress } from '@mui/material';
import React from 'react';
import DownloadIcon from '@mui/icons-material/Download';
const DownloadButton = ({ variant, submitForm, loadingDownload }) => {
  return (
    <Button
      onClick={(e) => submitForm(e)}
      color="success"
      variant={variant}
      startIcon={!loadingDownload ? <CircularProgress /> : <DownloadIcon />}
    >
      {!loadingDownload ? 'yükleniyor' : 'İndir'}
    </Button>
  );
};

export default DownloadButton;
