import { Box, CircularProgress, Paper, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { UserRolesEnum } from 'src/app/enums/roleList';
import DeleteButton from 'src/components/inputs/DeleteButton';
import UpdateButton from 'src/components/inputs/UpdateButton';
import RecordTraceCard from 'src/components/recordTraceCard/RecordTraceCard';
import usePermission from 'src/hooks/usePermission';
import { useGetUserDetailQuery } from 'src/store/services/user/userApiSlice';
import { setUserData } from 'src/store/services/user/userSlice';

function UserDetail() {
  const dispatch = useDispatch();

  const { userId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { data, isLoading, isSuccess, isError, error, refetch } = useGetUserDetailQuery(userId);
  //   const [
  //     deleteUser,
  //     {
  //       isLoading: isLoadingDeleteUser,
  //       isSuccess: isSuccesDeleteForm,
  //       isError: isErrorDeleteForm,
  //       error: errorDeleteForm,
  //     },
  //   ] = useDeleteUse();

  const userAuth = useSelector((state) => state.auth);
  const checkPermission = usePermission();

  const isAdvancedAdmin = checkPermission(UserRolesEnum.ADMIN.id);

  let userData = {};

  useEffect(() => {
    if (error) {
      //TODO:  error snackbar
      navigate('/user');
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess && data.data) {
      dispatch(setUserData(data?.data));
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
    navigate('/user');
  };

  console.log('data', data);
  if (isLoading) {
    return <CircularProgress />;
  }

  if (isSuccess) {
    userData = data.data;

    return (
      <div>
        <Typography variant="h2">Kullanıcı</Typography>
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
          {isAdvancedAdmin && (
            <DeleteButton
              onClick={handleDelete}
              variant="outlined"
              //   loading={isLoadingDeleteForm}
              //   disabled={isLoadingDeleteForm}
            />
          )}
          <UpdateButton
            onClick={() => navigate('/user/update/' + userId)}
            disabled={!isAdvancedAdmin || isLoading}
            variant="outlined"
            loading={isLoading}
          />
        </Paper>
        <Box className="flex flex-col sm:flex-row gap-4">
          <Paper sx={{ flex: 2, padding: '1rem' }}>
            <Box>
              <Typography variant="h3">Kullanıcı Bilgileri</Typography>
              <Box>
                <Typography variant="h5">Öğrenci</Typography>
                <Typography>
                  {userData?.student?.name} {userData?.student?.last_name}
                </Typography>
              </Box>
            </Box>
          </Paper>
          <Box className="flex flex-1 flex-col">
            <RecordTraceCard record={userData} />
          </Box>
        </Box>
      </div>
    );
  }

  return null;
}

export default UserDetail;
