import { Box, Button, Paper, Container, Tooltip, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import CustomDetailPageBox from 'src/components/inputs/CustomDetailPageBox';
import RecordTraceCard from 'src/components/recordTraceCard/RecordTraceCard';
import { useGetStatusDetailQuery } from 'src/store/services/internStatus/internStatusApiSlice';
import { setInternStatusData } from 'src/store/services/internStatus/internStatusSlice';
import { Link } from 'react-router-dom';

import CallMadeSharpIcon from '@mui/icons-material/CallMadeSharp';
import EditIcon from '@mui/icons-material/Edit';

import { useEffect } from 'react';
import EnhancedTable from 'src/components/data/CustomMUITable';
import CustomCircularProgress from 'src/components/loader/CustomCircularProgress';
import dayjs from 'dayjs';
import { InternStatusEnum } from 'src/app/enums/internStatus';
import DeleteButton from 'src/components/inputs/DeleteButton';
import usePermission from 'src/hooks/usePermission';
import { UserRolesEnum } from 'src/app/enums/roleList';
import CustomIconButton from 'src/components/inputs/CustomIconButton';
function InternStatusDetail() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const checkPermission = usePermission();

  const isAdvancedComission = checkPermission(UserRolesEnum.COMISSION.id);

  const { internStatusId } = useParams();

  const { data, isLoading, isSuccess, isError, error, refetch, isFetching, currentData } =
    useGetStatusDetailQuery(internStatusId);

  let internStatusData = {};
  const internStatusTracks = data?.data?.internStatusTracks || [];
  useEffect(() => {
    if (isSuccess && data.data) {
      dispatch(setInternStatusData(data?.data));
    }
  }, [isSuccess]);

  useEffect(() => {
    refetch();
  }, [location, navigate]);

  useEffect(() => {
    if (isError) {
      navigate('/intern-status');
    }
  }, [error]);

  console.log('data', data);

  if (isLoading) {
    return <CustomCircularProgress />;
  }

  if (isSuccess) {
    internStatusData = data.data;
  }

  const accordionData = [
    [{ header: 'Staj Bilgileri' }, { text: 'Staj Durumu', value: InternStatusEnum[data?.data?.status]?.label }],

    [
      { header: 'Mülakat Komisyon Bilgileri' },
      { text: 'Komisyon Adı', value: data?.data?.interview?.comission?.name },
      { text: 'Komisyon Soyadı', value: data?.data?.interview?.comission?.last_name },
    ],
    [
      { header: 'Staj Sorumlusu Bilgileri' },
      { text: 'Staj Sorumlusu Adı', value: data?.data?.form?.follow_up?.name },
      { text: 'Staj Sorumlusu Soyadı', value: data?.data?.form?.follow_up?.last_name },
    ],
    [
      { header: 'Öğrenci Bilgileri' },
      { text: 'Öğrenci Ad', value: data?.data?.student?.name },
      { text: 'Öğrenci Soyadı', value: data?.data?.student?.last_name },
      { text: 'Okul Numarası', value: data?.data?.student?.school_number },
      { text: 'T.C Kimlik Numarası', value: data?.data?.student?.tc_number },
    ],
  ];

  const headers = [
    {
      id: 'createdAt',
      numeric: false,
      disablePadding: true,
      label: 'Tarih',
      style: 'text-left',
      cellComponent: (value) => <p className="">{dayjs(value).format('DD.MM.YYYY')}</p>,
      notSortable: true,
    },
    {
      id: 'createdBy',
      numeric: false,
      disablePadding: true,
      label: 'Değişimi Yapan',
      style: 'text-left',
      cellComponent: (value) => <p className="">{value?.name ? value?.name + ' ' + value?.last_name : ''}</p>,
      notSortable: true,
    },
    {
      id: 'prevStatus',
      numeric: false,
      disablePadding: true,
      label: 'Önceki Durum',
      style: 'text-left',
      cellComponent: (value) => <p className="">{InternStatusEnum[value]?.label}</p>,
      notSortable: true,
    },
    {
      id: 'nextStatus',
      numeric: false,
      disablePadding: true,
      label: 'Sonraki Durum',
      style: 'text-left',
      cellComponent: (value) => <p className="">{InternStatusEnum[value]?.label}</p>,
      notSortable: true,
    },
    {
      id: 'desc',
      numeric: false,
      disablePadding: true,
      label: 'Açıklama',
      style: 'text-left',
      cellComponent: (value) => <p className="">{value}</p>,
      notSortable: true,
    },
  ];

  return (
    <div>
      <Typography variant="h2">Staj Durumu</Typography>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'row-reverse',
          padding: '1rem',
          marginBottom: '1rem',
          gap: '1rem',
        }}
      >
        {isAdvancedComission && (
          <Tooltip title="Staj Durumu silmek için lütfen ilgili Staj Formunu silin.">
            <span>
              <DeleteButton disabled />
            </span>
          </Tooltip>
        )}

        {isAdvancedComission && (
          <CustomIconButton
            onClick={() => navigate('/intern-status/update/' + internStatusId)}
            color={'primary'}
            Icon={<EditIcon />}
            text={'Staj Durumunu Güncelle'}
          />
        )}
      </Paper>
      <Box className="flex flex-col 2xl:flex-row gap-4">
        <Paper sx={{ flex: 2 }}>
          <Container className="my-2 px-6 gap-2 flex">
            {data?.data.interview_id && (
              <Link to={`/interview/${data.data.interview_id}`}>
                <span className="underline">İlgili Mülakat</span> <CallMadeSharpIcon className="text-sm text-black" />
              </Link>
            )}
            {data?.data.form_id && (
              <Link to={`/intern-form/${data.data.form_id}`}>
                <span className="underline">İlgili Staj Formu</span>
                <CallMadeSharpIcon className="text-sm text-black" />
              </Link>
            )}
          </Container>
          <CustomDetailPageBox data={accordionData} />
          {internStatusTracks.length > 0 && (
            <Container>
              <Typography variant="h4" className="mb-4">
                Staj Durumu Takip Tablosu
              </Typography>
              <EnhancedTable
                columns={headers}
                filter={[]}
                data={currentData?.data.internStatusTracks || []}
                isLoading={isFetching || isLoading}
                isSuccess={isSuccess}
                dataLength={currentData?.data?.internStatusTracks.length}
                setFilter={(values) => console.log(values)}
                infoOnly
              />
            </Container>
          )}
        </Paper>
        <Box>
          <RecordTraceCard record={internStatusData} />
        </Box>
      </Box>
    </div>
  );
}

export default InternStatusDetail;
