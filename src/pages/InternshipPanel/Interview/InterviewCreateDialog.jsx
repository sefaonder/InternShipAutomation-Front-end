import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  useMediaQuery,
} from '@mui/material';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useGetComissionACQuery, useGetInternStatusACQuery } from 'src/app/api/autocompleteSlice';
import CustomAutocomplete from 'src/components/inputs/CustomAutocomplete';
import CustomDateTimeInput from 'src/components/inputs/CustomDateTimeInput';
import { useStartInterviewsMutation } from 'src/store/services/internshipPanel/internshipPanelApiSlice';

function InterviewCreateDialog({ open, handleClose, onSucces, selectedRecords, loading }) {
  const [startInterviews, { isLoading }] = useStartInterviewsMutation();

  const matches = useMediaQuery('(min-width:1000px)');

  console.log('selectedRecords', selectedRecords);

  const [interviews, setInterviews] = useState([{ internStatusId: null, comission: null, date: null }]);

  console.log('interviews', interviews);

  const handleInterviewChange = (index, field, value) => {
    const updatedInterviews = [...interviews];
    updatedInterviews[index][field] = value;
    setInterviews(updatedInterviews);
  };

  useEffect(() => {
    const recordData = [];
    selectedRecords.map((item, index) => {
      recordData.push({ internStatusId: item.id, comission: null, date: null });
    });

    setInterviews(recordData);
  }, [selectedRecords]);

  return (
    <Dialog
      scroll="paper"
      open={open}
      onClose={handleClose}
      maxWidth={'lg'}
      PaperProps={{
        component: 'form',
        onSubmit: async (event) => {
          event.preventDefault();

          const payload = interviews.map((item) => ({
            internStatusId: item.internStatusId,
            comissionId: item.comission.id,
            date: dayjs(item.date).toDate(),
          }));

          try {
            const response = await startInterviews({ interviews: payload }).unwrap();

            enqueueSnackbar(response.message, { variant: 'success' });
          } catch (error) {
            console.log(error);
          }
          onSucces();
          handleClose();
        },
      }}
    >
      <DialogTitle>Mülakatları Tanımla</DialogTitle>
      <DialogContent className="flex flex-col gap-4">
        <DialogContentText>
          Staj Tarihlerinide iş gününden sayılmaması için lütfen Resmi Tatil Günlerini Ekleyiniz
        </DialogContentText>
        {selectedRecords.map((interview, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: matches ? 'row' : 'column',
              backgroundColor: index % 2 === 0 ? '#ececec' : 'white',
              padding: '1rem',
              gap: '1rem',
            }}
          >
            <Typography sx={{ minWidth: '2rem' }}>{index + 1} - </Typography>
            <CustomAutocomplete
              sx={{ minWidth: '15rem' }}
              name={`internStatus-${index}`}
              id={`internStatus-${index}`}
              label={'İlgili Staj Durumu'}
              disabled
              value={{ id: interview.id }}
              filterId={interview.id}
              onChange={(value) => handleInterviewChange(index, 'internStatus', value)}
              required
              useACSlice={useGetInternStatusACQuery}
            />
            <CustomAutocomplete
              sx={{ minWidth: '15rem' }}
              name={`comission-${index}`}
              id={`comission-${index}`}
              label={'Mülakat Yetkilisi'}
              value={interviews[index]?.comission}
              onChange={(value) => handleInterviewChange(index, 'comission', value)}
              required
              useACSlice={useGetComissionACQuery}
            />
            <CustomDateTimeInput
              style={{ minWidth: '15rem' }}
              id={`date-${index}`}
              name={`date-${index}`}
              label="Mülakat Tarihi"
              value={interviews[index]?.date}
              onChange={(value) => handleInterviewChange(index, 'date', value)}
            />
            {/* <Button onClick={() => removeInterview(index)}>Sil</Button> */}
          </Box>
        ))}
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

export default InterviewCreateDialog;
