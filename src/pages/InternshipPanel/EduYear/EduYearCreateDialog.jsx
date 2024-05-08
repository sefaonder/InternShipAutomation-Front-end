import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react';
import CustomTextInput from 'src/components/inputs/CustomTextInput';
import { useAddEduYearMutation } from 'src/store/services/internshipPanel/internshipPanelApiSlice';

function EduYearCreateDialog({ open, handleClose, onSucces }) {
  const [addEduYear, { isLoading }] = useAddEduYearMutation();
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: async (event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());
          const eduYear = formJson.eduYear;
          console.log(eduYear);

          try {
            const response = await addEduYear({ eduYear: eduYear }).unwrap();

            enqueueSnackbar(response.message, { variant: 'success' });
          } catch (error) {
            console.log(error);
          }
          onSucces();
          handleClose();
        },
      }}
    >
      <DialogTitle>Staj Dönemi Ekle</DialogTitle>
      <DialogContent className="flex flex-col gap-4">
        <DialogContentText maxWidth="20rem">
          Öğrencilerin staj tarihlerini belirlemesi için lütfen geçerli staj dönemi / dönemlerini ekleyin.
        </DialogContentText>
        <CustomTextInput id="eduYear" name="eduYear" required label="Tatil Günü" />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={isLoading}>
          İptal
        </Button>
        <Button type="submit" disabled={isLoading}>
          Ekle
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EduYearCreateDialog;
