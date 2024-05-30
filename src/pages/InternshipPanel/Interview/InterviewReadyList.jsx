import { CheckBox } from '@mui/icons-material';
import { Box, Button, Checkbox, Typography } from '@mui/material';
import React, { useState } from 'react';
import CustomSelectList from 'src/components/data/CustomSelectList';
import {
  useGetInterviewReadyQuery,
  useStartInterviewsMutation,
} from 'src/store/services/internshipPanel/internshipPanelApiSlice';
import InterviewCreateDialog from './InterviewCreateDialog';
import InterviewDateDialog from './InterviewDateDialog';

function InterviewReadyList({ open }) {
  const [checked, setChecked] = useState([]);

  const { data, isLoading, refetch } = useGetInterviewReadyQuery({}, { skip: !open });
  const [dialog, setDialog] = useState({ create: false, date: false });
  const [interviewDate, setInterviewDate] = useState({ interviewStartDate: null, interviewEndTime: null });

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const selectAllRecord = (records) => {
    const recordIds = records.map((item) => item.id);
    setChecked(recordIds);
  };

  const clearAllRecord = () => {
    setChecked([]);
  };

  function getIntersectionRecords(data, checkedIds) {
    if (!data || !checkedIds) {
      return [];
    }
    return data.reduce((intersection, record) => {
      if (checkedIds.includes(record.id)) {
        intersection.push(record);
      }
      return intersection;
    }, []);
  }

  function toggleDialog(dialogType) {
    if (dialogType === 'date') {
      setDialog({ date: true });
    } else if (dialogType === 'create') {
      setDialog({ create: true });
    } else {
      setDialog({ date: false, create: false });
    }
  }
  return (
    <Box>
      <Typography variant="h5">Mülakata Hazır Stajlar</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: '1rem' }}>
        <Checkbox
          checked={data?.data.length === checked.length}
          onClick={() => (checked.length > 0 ? clearAllRecord() : selectAllRecord(data?.data))}
        />
        <Button variant="outlined" disabled={checked.length < 1} onClick={() => toggleDialog('date')}>
          Mülakat Tarihlerini Ata
        </Button>
      </Box>
      <CustomSelectList handleToggle={handleToggle} checked={checked} data={data?.data} loading={isLoading} />
      <InterviewDateDialog
        open={dialog.date}
        handleClose={() => toggleDialog('reset')}
        setDates={({ interviewStartDate, interviewEndTime }) =>
          setInterviewDate({ interviewStartDate: interviewStartDate, interviewEndTime: interviewEndTime })
        }
        onSucces={() => toggleDialog('create')}
      />
      <InterviewCreateDialog
        open={dialog.create}
        startDate={interviewDate.interviewStartDate}
        endDate={interviewDate.interviewEndTime}
        handleClose={() => toggleDialog('reset')}
        onSucces={() => refetch()}
        selectedRecords={getIntersectionRecords(data?.data, checked)}
      />
    </Box>
  );
}

export default InterviewReadyList;
