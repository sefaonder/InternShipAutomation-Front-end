import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useGetComissionACQuery, useGetInternStatusACQuery } from 'src/app/api/autocompleteSlice';
import CustomAutocomplete from 'src/components/inputs/CustomAutocomplete';
import CustomDateTimeInput from 'src/components/inputs/CustomDateTimeInput';
import { useStartInterviewsMutation } from 'src/store/services/internshipPanel/internshipPanelApiSlice';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Link } from 'react-router-dom';

function InterviewCreateDialog({ open, handleClose, onSucces, selectedRecords, loading, startDate, endDate }) {
  const [startInterviews, { isLoading }] = useStartInterviewsMutation();

  const matches = useMediaQuery('(min-width:1000px)');

  console.log('selectedRecords', selectedRecords);

  const [interviews, setInterviews] = useState([{ interviewId: null, comission: null, date: null }]);

  const { data, isLoading: isLoadingQuery, isSuccess } = useGetComissionACQuery({}, { skip: !open });

  console.log('data', data);

  function distributeRecords(selectedRecords, comissions, interviewStartDate, interviewEndTime) {
    const recordsPerPerson = Math.ceil(selectedRecords.length / comissions.length);
    const interval = 15 * 60 * 1000; // 15 dakika milisaniye cinsinden

    const hourTime = dayjs(interviewEndTime, 'HH:mm').format('HH:mm');
    console.log('hourTime', hourTime);
    const interviewEndTimeHour = parseInt(hourTime.split(':')[0]);
    const interviewEndTimeMinute = parseInt(hourTime.split(':')[1]);

    const interviewStartDateTime = new Date(dayjs(interviewStartDate, 'DD.MM.YYYY HH:mm').toDate());

    console.log('zamanlar', interviewEndTime, interviewEndTimeHour, interviewEndTimeMinute);
    console.log('selectedRecords22', selectedRecords);

    const results = [];

    for (let i = 0; i < selectedRecords.length; i++) {
      const personIndex = Math.floor(i / recordsPerPerson);
      const person = comissions[personIndex % comissions.length];
      let interviewDateTime = new Date(interviewStartDateTime);

      // Her kişiye kendi zaman dilimini hesapla
      const personIndexOffset = Math.floor(personIndex / comissions.length);
      interviewDateTime.setDate(interviewDateTime.getDate() + personIndexOffset);

      // Her kayıt için zamanı ayarla
      const recordIndex = i % recordsPerPerson;
      interviewDateTime.setTime(interviewStartDateTime.getTime() + recordIndex * interval);

      // Eğer mülakat zamanı bitiş saatini geçerse, bir sonraki güne geç
      if (
        interviewDateTime.getHours() >= interviewEndTimeHour &&
        interviewDateTime.getMinutes() > interviewEndTimeMinute
      ) {
        interviewDateTime.setDate(interviewDateTime.getDate() + 1);
        interviewDateTime.setHours(interviewStartDateTime.getHours());
        interviewDateTime.setMinutes(interviewStartDateTime.getMinutes());
      }

      results.push({
        record: selectedRecords[i],
        person: person,
        date: dayjs(interviewDateTime),
      });
    }
    return results;
  }

  console.log('interviews', interviews);

  const handleInterviewChange = (index, field, value) => {
    const updatedInterviews = [...interviews];
    updatedInterviews[index][field] = value;
    setInterviews(updatedInterviews);
  };

  useEffect(() => {
    const recordData = [];
    if (data?.data.length > 0 && selectedRecords.length > 0 && startDate && endDate) {
      const result = distributeRecords(selectedRecords, data?.data, startDate, endDate);

      result.map((item) => {
        recordData.push({ interviewId: item.record.id, comission: { id: item.person.id }, date: item.date });
      });

      console.log('result', result);
    }

    // selectedRecords.map((item, index) => {
    //   recordData.push({ interviewId: item.id, comission: null, date: null });
    // });

    setInterviews(recordData);
  }, [selectedRecords, isSuccess]);

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
            interviewId: item.interviewId,
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
      <DialogTitle>Mülakat Tarihlerini ve Yetkili Komisyon Üyesi Ata</DialogTitle>
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
            <Typography sx={{ minWidth: '2rem', marginY: 'auto' }}>{index + 1} - </Typography>
            <Box className="flex items-start flex-shrink-0 flex-col justify-center">
              <Typography variant="h5">Öğrenci</Typography>

              <Box>
                <Typography variant="p">{interview.student.name + ' ' + interview.student.last_name}</Typography>
                <Typography variant="p">{' - ' + interview.student.school_number}</Typography>
              </Box>
            </Box>
            <Box className="flex items-center flex-shrink-0">
              <Typography variant="p">
                <Typography variant="h5">Staj Tarihi</Typography>

                {dayjs(interview.internStatus.form.start_date).format('DD.MM.YYYY') +
                  ' - ' +
                  dayjs(interview.internStatus.form.end_date).format('DD.MM.YYYY')}
              </Typography>
            </Box>
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
            <Tooltip title="İlgili Mülakat Kaydı">
              <Link className="flex" to={'/interview/' + interview.id} target="_blank">
                <IconButton aria-label="releatedInterview">
                  <OpenInNewIcon />
                </IconButton>
              </Link>
            </Tooltip>

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
