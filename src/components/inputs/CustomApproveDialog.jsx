import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react';

function CustomApproveDialog({ open, handleClose, dialogTitle, dialogContent, action }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{dialogContent}</DialogContentText>
      </DialogContent>
      <DialogActions>{action}</DialogActions>
    </Dialog>
  );
}

export default CustomApproveDialog;
