import { Box, Paper } from '@mui/material';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserRolesEnum } from 'src/app/enums/roleList';
import EnhancedTable from 'src/components/data/CustomMUITable';
import CustomTableFilter from 'src/components/data/CustomTableFilter';
import ListPageHeader from 'src/components/details/ListPageHeader';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useGetGraduatedExcelListMutation, useGetUsersQuery } from 'src/store/services/user/userApiSlice';
import { clearUserData } from 'src/store/services/user/userSlice';
import CustomIconButton from 'src/components/inputs/CustomIconButton';

function UserList() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [filter, setFilter] = useState({});
  const { data, isLoading, isSuccess, isError, error, refetch, currentData, isFetching } = useGetUsersQuery(filter);

  const [getGraduatedExcelList, { isLoading: isLoadingExcel }] = useGetGraduatedExcelListMutation();

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
    dispatch(clearUserData());
  }, [location, navigate]);

  const handleDownloadExcel = async () => {
    try {
      const response = await getGraduatedExcelList();
    } catch (error) {
      console.log(error);
    }
  };

  const headers = [
    {
      id: 'createdAt',
      numeric: false,
      disablePadding: true,
      label: 'Oluşturulma Zamanı',
      style: 'text-left',
      cellComponent: (value) => <p className="">{moment(value).format('DD.MM.YYYY')}</p>,
    },
    {
      id: 'name',
      numeric: false,
      disablePadding: true,
      label: 'İsim',
      style: 'text-left',
      cellComponent: (value) => <p className="">{value}</p>,
    },
    {
      id: 'last_name',
      numeric: false,
      disablePadding: true,
      label: 'Soyisim',
      style: 'text-left',
      cellComponent: (value) => <p className="">{value}</p>,
    },
    {
      id: 'user_type',
      numeric: false,
      disablePadding: true,
      label: 'Kullanıcı Rolü',
      style: 'text-left',
      cellComponent: (value) => <p className="">{UserRolesEnum[value]?.label}</p>,
    },
    {
      id: 'tc_number',
      numeric: false,
      disablePadding: true,
      label: 'T.C Kimlik numarası',
      style: 'text-left',
      cellComponent: (value) => <p className="">{value}</p>,
    },
    {
      id: 'school_number',
      numeric: false,
      disablePadding: true,
      label: 'Okul Numarası',
      style: 'text-left',
      cellComponent: (value) => <p className="">{value}</p>,
    },
  ];

  const userFilters = [
    { id: 'schoolNumber', type: 'text', componentProps: { label: 'Okul Numarası' } },
    { id: 'userType', type: 'enum', componentProps: { enumObject: UserRolesEnum, label: 'Kullanıcı Yetkisi' } },
    { id: 'name', type: 'text', componentProps: { label: 'İsim' } },
    { id: 'last_name', type: 'text', componentProps: { label: 'Soyisim' } },
    { id: 'isGraduate', type: 'boolean', componentProps: { label: 'Sadece Mezunlar' } },
  ];

  return (
    <Box>
      <ListPageHeader
        header={'Kullanıcı Listesi'}
        location={location.pathname}
        tooltipTitle="Kullanıcı Ekle"
        endComponent={
          <CustomIconButton
            onClick={handleDownloadExcel}
            color={'success'}
            loading={isLoadingExcel}
            disabled={isLoadingExcel}
            Icon={<FileDownloadIcon />}
            text={'EXCEL'}
          />
        }
      />
      <Paper>
        <CustomTableFilter
          filterOptions={userFilters}
          filterValues={filter}
          onChangeFilterValues={handleFilterChange}
          setRefresh={() => refetch()}
        />
        <EnhancedTable
          columns={headers}
          data={currentData?.data || []}
          isLoading={isFetching || isLoading}
          isSuccess={isSuccess}
          filter={filter}
          dataLength={currentData?.dataLength}
          setFilter={(values) => setFilter({ ...filter, ...values })}
        />
      </Paper>
    </Box>
  );
}

export default UserList;
