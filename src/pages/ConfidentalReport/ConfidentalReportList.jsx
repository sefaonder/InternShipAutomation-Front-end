import React, { useEffect, useState } from 'react';
import { Box, Paper } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import EnhancedTable from 'src/components/data/CustomMUITable';
import CustomTableFilter from 'src/components/data/CustomTableFilter';
import AddButton from 'src/components/inputs/AddButton';
import { useGetConfidentalReportsQuery } from 'src/store/services/confidentalReport/confidentalReportApiSlice';
import { resetConfidentalReport } from 'src/store/services/confidentalReport/confidentalReportSlice';
import { useDispatch } from 'react-redux';
import { InternStatusEnum } from 'src/app/enums/internStatus';
import { useGetComissionACQuery, useGetEduYearACQuery, useGetStudentACQuery } from 'src/app/api/autocompleteSlice';
import ListPageHeader from 'src/components/details/ListPageHeader';
import moment from 'moment';

const ConfidentalReportList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [filter, setFilter] = useState({});
  const { data, isLoading, isSuccess, isError, error, refetch, currentData, isFetching } =
    useGetConfidentalReportsQuery();

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
    dispatch(resetConfidentalReport());
  }, [location, navigate]);

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
      id: 'interview',
      numeric: false,
      disablePadding: true,
      label: 'Öğrenci',
      style: 'text-left',
      notSortable: true,
      cellComponent: (value) => (
        <p className="">{value.student ? value.student?.name + ' ' + value.student?.last_name : ''}</p>
      ),
    },
    {
      id: 'interview',
      numeric: false,
      disablePadding: true,
      label: 'Mülakatı Yapan',
      style: 'text-left',
      notSortable: true,
      cellComponent: (value) => (
        <p className="">{value.comission ? value.comission?.name + ' ' + value.comission?.last_name : ''}</p>
      ),
    },
    {
      id: 'company_name',
      numeric: false,
      disablePadding: true,
      label: 'Firma Adı',
      style: 'text-left',
      cellComponent: (value) => <p className="">{value}</p>,
    },
    {
      id: 'start_date',
      numeric: false,
      disablePadding: true,
      label: 'Başlangıç Tarihi',
      style: 'text-left',
      cellComponent: (value) => <p className="">{moment(value).format('DD.MM.YYYY')}</p>,
    },
    {
      id: 'end_date',
      numeric: false,
      disablePadding: true,
      label: 'Bitiş Tarihi',
      style: 'text-left',
      cellComponent: (value) => <p className="">{moment(value).format('DD.MM.YYYY')}</p>,
    },
    {
      id: 'department',
      numeric: false,
      disablePadding: true,
      label: 'Departman',
      style: 'text-left',
      cellComponent: (value) => <p className="">{value}</p>,
    },
    {
      id: 'auth_name',
      numeric: false,
      disablePadding: true,
      label: 'Firma Yetkilisi',
      style: 'text-left',
      cellComponent: (value) => <p className="">{value}</p>,
    },
  ];

  const confidentalReportFilters = [
    { id: 'student', type: 'autocomplete', componentProps: { useACSlice: useGetStudentACQuery, label: 'Öğrenci' } },
    { id: 'eduYear', type: 'autocomplete', componentProps: { useACSlice: useGetEduYearACQuery, label: 'Staj Dönemi' } },
    {
      id: 'comission',
      type: 'autocomplete',
      componentProps: { useACSlice: useGetComissionACQuery, label: 'Mülakat yapan' },
    },
    { id: 'companyName', type: 'text', componentProps: { label: 'Firma adı' } },
    { id: 'authName', type: 'text', componentProps: { label: 'Firma Yetkilisi' } },
  ];

  return (
    <Box>
      <ListPageHeader header={'Gizli Sicil Fişi Listesi'} location={location.pathname} />
      <Paper>
        <CustomTableFilter
          filterOptions={confidentalReportFilters}
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
};

export default ConfidentalReportList;
