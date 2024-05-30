import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react';
import CustomDateTimeInput from 'src/components/inputs/CustomDateTimeInput';
import CustomTimePicker from 'src/components/inputs/CustomTimePicker';

function InterviewDateDialog({ open, setDates, dates, onSucces, handleClose, isLoading }) {
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
          const interviewStartDate = formJson.interviewStartDate;
          const interviewEndTime = formJson.interviewEndTime;

          console.log('times', interviewStartDate, interviewEndTime);

          setDates({ interviewStartDate: interviewStartDate, interviewEndTime: interviewEndTime });
          onSucces();
        },
      }}
    >
      <DialogTitle>Mülakat Zamanı Seçimi</DialogTitle>
      <DialogContent className="flex flex-col gap-4">
        <DialogContentText maxWidth="20rem">
          Mülakatın Başlangıç Tarihini ve en son kabul edilebilir saati seçin kayıtlar otomatik dağıtılacaktır.
        </DialogContentText>
        <CustomDateTimeInput
          id="interviewStartDate"
          name="interviewStartDate"
          required
          label="Mülakat Başlama Zamanı"
        />
        <CustomTimePicker id="interviewEndTime" name="interviewEndTime" required label="Mülakat Bitiş Saati" />
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

export default InterviewDateDialog;
