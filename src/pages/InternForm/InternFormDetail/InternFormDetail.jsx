import { Box, Button, CircularProgress, Paper, Stack, Typography } from '@mui/material';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetFormDetailQuery } from 'src/store/services/internForm/internFormApiSlice';
import { setInternFormData } from 'src/store/services/internForm/internFormSlice';

function InternFormDetail() {
  const dispatch = useDispatch();

  const { internFormId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isSuccess, isError, error } = useGetFormDetailQuery(internFormId);

  let internFormData = {};

  useEffect(() => {
    if (isSuccess && data.data) {
      dispatch(setInternFormData(data?.data));
    }
  }, [isSuccess]);

  console.log('data', data);
  if (isLoading) {
    return <CircularProgress />;
  }

  if (isSuccess) {
    internFormData = data.data;
  }

  return (
    <div>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'row-reverse',
          padding: '1rem',
          marginBottom: '1rem',
        }}
      >
        <Button onClick={() => navigate('/intern-form/update/' + internFormId)}>Güncelle</Button>
      </Paper>
      <Box className="flex flex-col sm:flex-row gap-4">
        <Paper sx={{ flex: 2, padding: '1rem' }}>Main Card</Paper>
        <Paper sx={{ flex: 1, padding: '1rem' }}>
          <Stack spacing={2}>
            <Box className="flex flex-col gap-2">
              <Typography variant="h5">Kayıt Oluşturulma Tarihi</Typography>
              <Typography>{moment(internFormData.createdAt).format('DD.MM.YYYY HH:mm:ss')}</Typography>
            </Box>
            <Box className="flex flex-col gap-2">
              <Typography variant="h5">Kaydı oluşturan kişi</Typography>
              <Typography>{internFormData.createdBy.name + ' ' + internFormData.createdBy.last_name}</Typography>
            </Box>

            <Box className="flex flex-col gap-2">
              <Typography variant="h5">Son Güncelleme Tarihi</Typography>
              {internFormData.updatedAt && (
                <Typography>{moment(internFormData.updatedAt).format('DD.MM.YYYY HH:mm:ss')}</Typography>
              )}
            </Box>
            <Box className="flex flex-col gap-2">
              <Typography variant="h5">Son Güncelleyen kişi</Typography>
              {internFormData.updatedBy && (
                <Typography>{internFormData.updatedBy.name + ' ' + internFormData.updatedBy.last_name}</Typography>
              )}
            </Box>
          </Stack>
        </Paper>
      </Box>
    </div>
  );
}

export default InternFormDetail;
