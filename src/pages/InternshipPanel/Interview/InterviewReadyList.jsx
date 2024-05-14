import { CheckBox } from '@mui/icons-material';
import { Box, Button, Checkbox, Typography } from '@mui/material';
import React, { useState } from 'react';
import CustomSelectList from 'src/components/data/CustomSelectList';
import {
  useGetInterviewReadyQuery,
  useStartInterviewsMutation,
} from 'src/store/services/internshipPanel/internshipPanelApiSlice';
import InterviewCreateDialog from './InterviewCreateDialog';

function InterviewReadyList({ open }) {
  const [checked, setChecked] = useState([]);

  const { data, isLoading, refetch } = useGetInterviewReadyQuery({}, { skip: !open });
  const [dialog, setDialog] = useState(false);

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
  return (
    <Box>
      <Typography variant="h5">Mülakata Hazır Stajlar</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Checkbox checked={data?.data.length === checked.length} onClick={() => selectAllRecord(data?.data)} />
        <Button disabled={checked.length < 1} onClick={() => setDialog(true)}>
          Mülakat Tanımla
        </Button>
      </Box>
      <CustomSelectList handleToggle={handleToggle} checked={checked} data={data?.data} loading={isLoading} />
      <InterviewCreateDialog
        open={dialog}
        handleClose={() => setDialog(false)}
        onSucces={() => refetch()}
        selectedRecords={getIntersectionRecords(data?.data, checked)}
      />
    </Box>
  );
}

export default InterviewReadyList;
