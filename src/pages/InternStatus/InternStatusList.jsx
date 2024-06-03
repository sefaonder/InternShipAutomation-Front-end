import { Box, Paper } from '@mui/material';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetComissionACQuery, useGetEduYearACQuery, useGetStudentACQuery } from 'src/app/api/autocompleteSlice';
import { InternStatusEnum } from 'src/app/enums/internStatus';
import EnhancedTable from 'src/components/data/CustomMUITable';
import CustomTableFilter from 'src/components/data/CustomTableFilter';
import ListPageHeader from 'src/components/details/ListPageHeader';
import CustomIconButton from 'src/components/inputs/CustomIconButton';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useGetExcelListMutation, useGetStatusesQuery } from 'src/store/services/internStatus/internStatusApiSlice';
import { clearInternStatusData } from 'src/store/services/internStatus/internStatusSlice';
import usePermission from 'src/hooks/usePermission';
import { UserRolesEnum } from 'src/app/enums/roleList';
import { projectSnackbar } from 'src/app/handlers/ProjectSnackbar';

function InternStatusList() {
  const [filter, setFilter] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, currentData, isLoading, isFetching, isSuccess, isError, error, refetch } = useGetStatusesQuery(filter);
  const [getExcelList, { isLoading: isLoadingExcel }] = useGetExcelListMutation();

  const checkPermission = usePermission();

  const isAdvancedComission = checkPermission(UserRolesEnum.COMISSION.id);

  const handleFilterChange = (values) => {
    const filterPayload = {
      ...values,
      studentId: values.student?.id ? values.student.id : undefined,
      eduYearId: values.eduYear?.id ? values.eduYear.id : undefined,
    };

    const filteredValues = Object.entries(filterPayload).reduce((acc, [key, value]) => {
      if (value !== '' && value !== undefined && value !== null) {
        acc[key] = value;
      }
      return acc;
    }, {});

    setFilter({ ...filteredValues });
  };

  useEffect(() => {
    refetch();
    dispatch(clearInternStatusData());
  }, [location, navigate]);

  const handleDownloadExcel = async () => {
    try {
      const response = await getExcelList();

      if (response.data) {
        projectSnackbar(response.data.message, { variant: 'success' });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const headers = [
    {
      id: 'student',
      numeric: false,
      disablePadding: true,
      label: 'Öğrenci',
      style: 'text-left',
      notSortable: true,
      cellComponent: (value) => <p className="">{value?.name}</p>,
    },
    {
      id: 'student',
      numeric: false,
      disablePadding: true,
      label: 'Öğrenci Numarası',
      style: 'text-left',
      notSortable: true,
      cellComponent: (value) => <p className="">{value?.school_number}</p>,
    },
    {
      id: 'form',
      numeric: false,
      disablePadding: true,
      label: 'Form Yetkilisi',
      style: 'text-left',
      notSortable: true,
      cellComponent: (value) => <p className="">{value?.follow_up.name}</p>,
    },
    {
      id: 'interview',
      numeric: false,
      disablePadding: true,
      label: 'Mülakat Yetkilisi',
      style: 'text-left',
      notSortable: true,
      cellComponent: (value) => <p className="">{value?.comission?.name}</p>,
    },
    {
      id: 'status',
      numeric: false,
      disablePadding: true,
      label: 'Staj Durumu',
      style: 'text-left',

      cellComponent: (value) => <p className="">{InternStatusEnum[value].label}</p>,
    },
    {
      id: 'form',
      numeric: false,
      disablePadding: true,
      label: 'Staj Başlangıç Tarihi',
      style: 'text-left',
      notSortable: true,
      cellComponent: (value) => (
        <p className="">{value.start_date ? moment(value.start_date).format('DD.MM.YYYY') : ''}</p>
      ),
    },
    {
      id: 'form',
      numeric: false,
      disablePadding: true,
      label: 'Staj Bitiş Tarihi',
      style: 'text-left',
      notSortable: true,
      cellComponent: (value) => <p className="">{value.end_date ? moment(value.end_date).format('DD.MM.YYYY') : ''}</p>,
    },
    {
      id: 'form',
      numeric: false,
      disablePadding: true,
      label: 'Staj Dönemi',
      style: 'text-left',
      notSortable: true,
      cellComponent: (value) => <p className="">{value?.edu_year?.name || ''}</p>,
    },
  ];

  const internStatusFilters = [
    { id: 'student', type: 'autocomplete', componentProps: { useACSlice: useGetStudentACQuery, label: 'Öğrenci' } },
    { id: 'eduYear', type: 'autocomplete', componentProps: { useACSlice: useGetEduYearACQuery, label: 'Staj Dönemi' } },

    {
      id: 'comission',
      type: 'autocomplete',
      componentProps: { useACSlice: useGetComissionACQuery, label: 'Mülakatı yapan' },
    },
    { id: 'status', type: 'enum', componentProps: { enumObject: InternStatusEnum, label: 'Staj durumu' } },
  ];

  return (
    <Box>
      <ListPageHeader
        header={'Staj Durumu Listesi'}
        endComponent={
          isAdvancedComission ? (
            <CustomIconButton
              onClick={handleDownloadExcel}
              color={'success'}
              loading={isLoadingExcel}
              disabled={isLoadingExcel}
              Icon={<FileDownloadIcon />}
              text={'EXCEL'}
            />
          ) : null
        }
      />

      <Paper>
        <CustomTableFilter
          filterOptions={internStatusFilters}
          filterValues={filter}
          onChangeFilterValues={handleFilterChange}
          setRefresh={() => refetch()}
        />
        <EnhancedTable
          columns={headers}
          data={currentData?.data || []}
          dataLength={currentData?.dataLength}
          isLoading={isFetching || isLoading}
          isSuccess={isSuccess}
          filter={filter}
          setFilter={(values) => setFilter({ ...filter, ...values })}
        />
      </Paper>
    </Box>
  );
}

export default InternStatusList;
