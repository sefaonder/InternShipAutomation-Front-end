import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import dayjs from 'dayjs';
import { enqueueSnackbar } from 'notistack';
import React from 'react';
import { projectSnackbar } from 'src/app/handlers/ProjectSnackbar';
import CustomDateInput from 'src/components/inputs/CustomDateInput';
import CustomTextInput from 'src/components/inputs/CustomTextInput';
import { useAddHolidayMutation } from 'src/store/services/internshipPanel/internshipPanelApiSlice';

function HolidayCreateDialog({ open, handleClose, onSucces }) {
  const [addHoliday, { isLoading }] = useAddHolidayMutation();
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
          const date = formJson.date;
          const desc = formJson.descHoliday;

          try {
            const response = await addHoliday({ date: dayjs(date, 'DD.MM.YYYY').toDate(), desc: desc });

            if (response.data) {
              projectSnackbar(response.data.message, { variant: 'success' });
            }
          } catch (error) {
            console.log(error);
          }
          onSucces();
          handleClose();
        },
      }}
    >
      <DialogTitle>Resmi Tatil Günü ekle</DialogTitle>
      <DialogContent className="flex flex-col gap-4">
        <DialogContentText maxWidth="20rem">
          Staj Tarihlerinide iş gününden sayılmaması için lütfen Resmi Tatil Günlerini Ekleyiniz
        </DialogContentText>
        <CustomDateInput id="date" name="date" required label="Tatil Günü" format="DD.MM.YYYY" />
        <CustomTextInput id="descHoliday" name="descHoliday" required label="Açıklama" />
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

export default HolidayCreateDialog;
