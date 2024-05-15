import { Alert, AlertTitle, Box, Button, CircularProgress, Paper, Typography } from '@mui/material';
import dayjs from 'dayjs';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { InternStatusEnum } from 'src/app/enums/internStatus';
import { UserRolesEnum } from 'src/app/enums/roleList';
import EnhancedTable from 'src/components/data/CustomMUITable';
import CustomDetailPageBox from 'src/components/inputs/CustomDetailPageBox';
import DeleteButton from 'src/components/inputs/DeleteButton';
import UpdateButton from 'src/components/inputs/UpdateButton';
import RecordTraceCard from 'src/components/recordTraceCard/RecordTraceCard';
import usePermission from 'src/hooks/usePermission';
import { useDeleteUserMutation, useGetUserDetailQuery } from 'src/store/services/user/userApiSlice';
import { setUserData } from 'src/store/services/user/userSlice';

function UserDetail() {
  const dispatch = useDispatch();

  const { userId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { data, isLoading, isSuccess, isError, error, refetch, currentData, isFetching } =
    useGetUserDetailQuery(userId);
  const [
    deleteUser,
    {
      isLoading: isLoadingDeleteUser,
      isSuccess: isSuccesDeleteForm,
      isError: isErrorDeleteForm,
      error: errorDeleteForm,
    },
  ] = useDeleteUserMutation();

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
      const response = await deleteUser(userId).unwrap();
    } catch (error) {
      console.log(error);
    }
    navigate('/user');
  };

  console.log('data', data);
  if (isLoading) {
    return <CircularProgress />;
  }

  const accordionData = [
    [
      { text: 'Kullanıcı İsmi', value: data?.data?.name },
      { text: 'Kullanıcı Soyismi', value: data?.data?.last_name },
    ],
    [
      { text: 'Staj Sorumlu Adı: ', value: data?.data?.follow_up?.name },
      { text: 'Staj Sorumlu Soyadı: ', value: data?.data?.follow_up?.last_name },
    ],
  ];

  const headers = [
    {
      id: 'form',
      numeric: false,
      disablePadding: true,
      label: 'Form Yetkilisi',
      style: 'text-left',
      cellComponent: (value) => <p className="">{value?.follow_up?.name + '' + value?.follow_up?.last_name}</p>,
      notSortable: true,
    },
    {
      id: 'interview',
      numeric: false,
      disablePadding: true,
      label: 'Mülakat Yetkilisi',
      style: 'text-left',
      cellComponent: (value) => (
        <p className="">{value?.comission ? value?.comission?.name + '' + value?.comission?.last_name : ''}</p>
      ),
      notSortable: true,
    },
    {
      id: 'status',
      numeric: false,
      disablePadding: true,
      label: 'Staj Durumu',
      style: 'text-left',
      cellComponent: (value) => <p className="">{InternStatusEnum[value]?.label}</p>,
      notSortable: true,
    },
    {
      id: 'form',
      numeric: false,
      disablePadding: true,
      label: 'Staj Başlangıç Tarihi',
      style: 'text-left',
      cellComponent: (value) => <p className="">{moment(value.start_date).format('DD.MM.YYYY')}</p>,
      notSortable: true,
    },
    {
      id: 'form',
      numeric: false,
      disablePadding: true,
      label: 'Staj Bitiş Tarihi',
      style: 'text-left',
      cellComponent: (value) => <p className="">{moment(value.end_date).format('DD.MM.YYYY')}</p>,
      notSortable: true,
    },
    {
      id: 'form',
      numeric: false,
      disablePadding: true,
      label: 'Toplam Staj Süresi',
      style: 'text-left',
      cellComponent: (value) => <p className="">{value.total_work_day}</p>,
      notSortable: true,
    },
  ];

  const calculateTotalWorkDay = (data) => {
    const initialValue = 0;

    if (!(data.length > 0)) {
      return 0;
    }

    const sumWithInitial = data.reduce((accumulator, currentValue) => {
      console.log('hihi', currentValue, accumulator);
      if (currentValue.status === InternStatusEnum.STJ00.id) {
        return accumulator + currentValue.form.total_work_day;
      } else {
        return accumulator;
      }
    }, initialValue);

    return sumWithInitial;
  };

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
              loading={isLoadingDeleteUser}
              disabled={isLoadingDeleteUser}
            />
          )}
          <UpdateButton
            onClick={() => navigate('/user/update/' + userId)}
            disabled={!isAdvancedAdmin || isLoading}
            variant="outlined"
            loading={isLoading}
          />
        </Paper>
        <Box className="flex flex-col 2xl:flex-row gap-4">
          <Paper sx={{ flex: 2, padding: '1rem' }}>
            <Box>
              <Typography variant="h3">Kullanıcı Bilgileri</Typography>
              <Box>
                <CustomDetailPageBox data={accordionData} />
              </Box>
              <Typography variant="h3" className="my-2">
                Staj Bilgileri
              </Typography>
              <Box>
                <EnhancedTable
                  columns={headers}
                  filter={[]}
                  data={currentData?.data.InternStatus || []}
                  isLoading={isFetching || isLoading}
                  isSuccess={isSuccess}
                  dataLength={currentData?.dataLength}
                  setFilter={(values) => console.log(values)}
                  navigateTo="intern-status"
                />
              </Box>
              <Alert severity="success">
                <Typography>
                  Toplam Onaylanmış Staj Günü:
                  <b>{calculateTotalWorkDay(currentData?.data.InternStatus)}</b>
                </Typography>
              </Alert>
            </Box>
          </Paper>
          <Box className="flex flex-1 flex-col gap-4">
            {userData.user_type === UserRolesEnum.STUDENT.id && userData.isGraduate && (
              <Paper sx={{ padding: '0.5rem', marginBottom: '1rem' }}>
                <Alert variant="outlined" severity="success" color="success">
                  <Typography>
                    Bu Öğrenci <b>Mezundur</b> Öğrenci Staj işlemlerini tamamlamıştır.
                  </Typography>
                </Alert>
              </Paper>
            )}
            <RecordTraceCard record={userData} />
          </Box>
        </Box>
      </div>
    );
  }

  return null;
}

export default UserDetail;
