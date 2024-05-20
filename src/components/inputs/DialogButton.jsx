import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useState } from 'react';

const DialogButton = ({
  message,
  button,
  type,
  className,
  disabled,
  onSubmit,
  loading,
  Icon,
  buttonColor,
  subContent,
}) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = async () => {
    setOpen(false);
    onSubmit();
  };

  return (
    <div>
      <Button
        variant="outlined"
        color={buttonColor}
        onClick={handleClickOpen}
        disabled={disabled}
        className={className}
        startIcon={loading ? <CircularProgress /> : Icon}
      >
        {button}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle variant="h5" id="alert-dialog-title">
          {'İşlemi Onaylıyormusunuz?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="mb-4" id="alert-dialog-description">
            {message}
          </DialogContentText>
          {subContent || null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Hayır
          </Button>
          <Button onClick={handleConfirm} color="primary" autoFocus type={type}>
            Evet
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogButton;
