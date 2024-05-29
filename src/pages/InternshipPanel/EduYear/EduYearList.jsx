import React, { useState } from 'react';
import {
  useDeleteEduYearMutation,
  useGetEduYearsQuery,
} from 'src/store/services/internshipPanel/internshipPanelApiSlice';
import EduYearCreateDialog from './EduYearCreateDialog';
import { Box, Button } from '@mui/material';
import CustomActionList from 'src/components/data/CustomActionList';

function EduYearList({ open }) {
  const { data, isLoading, refetch } = useGetEduYearsQuery({}, { skip: !open });

  const [deleteEduYear, { isLoading: isLoadingDelete }] = useDeleteEduYearMutation();

  const [dialog, setDialog] = useState(false);

  const handleDelete = async (id) => {
    try {
      const response = await deleteEduYear(id).unwrap();
      enqueueSnackbar(response.message, { variant: 'warning' });
    } catch (error) {
      console.log(error);
    } finally {
      refetch();
    }
  };

  console.log('data', data);
  return (
    <Box>
      <Button variant="outlined" onClick={() => setDialog(true)}>
        Staj Dönemi Ekle
      </Button>
      <Box>
        <CustomActionList
          listData={data?.data}
          loading={isLoading}
          onDelete={handleDelete}
          itemHandler={(item) => item?.name}
        />
      </Box>
      <EduYearCreateDialog open={dialog} handleClose={() => setDialog(false)} onSucces={() => refetch()} />
    </Box>
  );
}

export default EduYearList;
