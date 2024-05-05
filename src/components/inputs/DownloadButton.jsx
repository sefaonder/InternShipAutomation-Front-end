import { Button, CircularProgress } from '@mui/material';
import React from 'react';
import DownloadIcon from '@mui/icons-material/Download';
const DownloadButton = ({ loading, text, variant }) => {
  return (
    <Button color="success" variant={variant} startIcon={loading ? <CircularProgress /> : <DownloadIcon />}>
      {text}
    </Button>
  );
};

export default DownloadButton;
