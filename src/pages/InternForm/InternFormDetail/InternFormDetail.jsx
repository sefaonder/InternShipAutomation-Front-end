import { Alert, AlertTitle, Box, Button, CircularProgress, Paper, Stack, Typography } from '@mui/material';
import moment from 'moment';
import React, { useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { UserRolesEnum } from 'src/app/enums/roleList';
import { permissionControll } from 'src/app/permissions/permissionController';
import SealedRecordAlert from 'src/components/details/SealedRecordAlert';
import DeleteButton from 'src/components/inputs/DeleteButton';
import UpdateButton from 'src/components/inputs/UpdateButton';
import RecordTraceCard from 'src/components/recordTraceCard/RecordTraceCard';
import { useDeleteFormMutation, useGetFormDetailQuery } from 'src/store/services/internForm/internFormApiSlice';
import { setInternFormData } from 'src/store/services/internForm/internFormSlice';

function InternFormDetail() {
  const dispatch = useDispatch();

  const { internFormId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { data, isLoading, isSuccess, isError, error, refetch } = useGetFormDetailQuery(internFormId);
  const [
    deleteForm,
    {
      isLoading: isLoadingDeleteForm,
      isSuccess: isSuccesDeleteForm,
      isError: isErrorDeleteForm,
      error: errorDeleteForm,
    },
  ] = useDeleteFormMutation();

  const userRole = useReducer((state) => state.auth.roles);
  const studentPermission = permissionControll(userRole, UserRolesEnum.COMISSION);

  let internFormData = {};

  useEffect(() => {
    if (error) {
      //TODO:  error snackbar
      navigate('/intern-form');
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess && data.data) {
      dispatch(setInternFormData(data?.data));
    }
  }, [isSuccess]);

  useEffect(() => {
    refetch();
  }, [location, navigate]);

  const handleDelete = async () => {
    try {
      const response = await deleteForm(internFormId).unwrap();
    } catch (error) {
      console.log('error', error);
    }
    navigate('/intern-form');
  };

  console.log('data', data);
  if (isLoading) {
    return <CircularProgress />;
  }

  if (isSuccess) {
    internFormData = data.data;

    return (
      <div>
        <Typography variant="h2">Staj Formu</Typography>
        <Paper
          sx={{
            display: 'flex',
            flexDirection: 'row-reverse',
            padding: '1rem',
            marginBottom: '1rem',
            marginTop: '1rem',
            overflowX: 'auto',
            gap: '1rem',
          }}
        >
          {studentPermission && (
            <DeleteButton
              onClick={handleDelete}
              variant="outlined"
              loading={isLoadingDeleteForm}
              disabled={isLoadingDeleteForm}
            />
          )}
          <UpdateButton
            onClick={() => navigate('/intern-form/update/' + internFormId)}
            disabled={(internFormData?.isSealed && !studentPermission) || isLoading}
            variant="outlined"
            loading={isLoading}
          />
        </Paper>
        <Box className="flex flex-col sm:flex-row gap-4">
          <Paper sx={{ flex: 2, padding: '1rem' }}>
            <Box>
              <Typography variant="h3">Staj Bilgileri</Typography>
              <Box>
                <Typography variant="h5">Öğrenci</Typography>
                <Typography>
                  {internFormData?.student?.name} {internFormData?.student?.last_name}
                </Typography>
              </Box>
            </Box>
          </Paper>
          <Box className="flex flex-1 flex-col">
            {internFormData?.isSealed && <SealedRecordAlert />}
            <RecordTraceCard record={internFormData} />
          </Box>
        </Box>
      </div>
    );
  }

  return null;
}

export default InternFormDetail;
