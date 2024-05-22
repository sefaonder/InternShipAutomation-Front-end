import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const PopUp = ({ open, handleClose, item }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className="shadow-2xl"
    >
      <DialogTitle id="alert-dialog-title">{item.text}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <h2>
            {' '}
            {item.description} asd asdasdsa Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia, saepe in
            explicabo neque laudantium sint accusantium debitis quis ad suscipit, autem earum soluta distinctio possimus
            vel voluptas deserunt doloribus fuga optio modi dolores nostrum inventore tempora! Beatae minus dolor
            accusantium magni commodi? Odit nemo enim, reiciendis corporis et voluptatem dolore.{' '}
          </h2>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Kapat</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopUp;
