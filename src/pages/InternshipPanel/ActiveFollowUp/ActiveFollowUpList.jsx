import { Box, Button, CircularProgress, Typography } from '@mui/material';
import React, { useState } from 'react';
import CustomActionList from 'src/components/data/CustomActionList';
import { useGetActiveFollowUpQuery } from 'src/store/services/internshipPanel/internshipPanelApiSlice';
import ActiveFollowUpCreateDialog from './ActiveFollowUpCreateDialog';

function ActiveFollowUpList({ open }) {
  const { data, isLoading, refetch } = useGetActiveFollowUpQuery({}, { skip: !open });

  const [dialog, setDialog] = useState(false);

  console.log('data', data);
  if (isLoading) {
    return <CircularProgress />;
  }
  return (
    <Box>
      <Button variant="outlined" onClick={() => setDialog(true)}>
        {data?.data ? 'Staj Formu Yetkilisi Güncelle' : 'Yeni Staj Formu Sorumlusu Ekle'}
      </Button>
      <Box className="my-4 flex">
        <Typography variant="h5">
          {data?.data?.active_follow_up?.name + ' ' + data?.data?.active_follow_up?.last_name}
        </Typography>
        {/* <Typography variant="h5">{' ' + data?.data?.active_follow_up?.tc_number}</Typography> */}
      </Box>
      <ActiveFollowUpCreateDialog
        open={dialog}
        handleClose={() => setDialog(false)}
        onSucces={() => refetch()}
        activeFollowUp={data?.data}
      />
    </Box>
  );
}

export default ActiveFollowUpList;
