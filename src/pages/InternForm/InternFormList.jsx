import { Box, Paper } from '@mui/material';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetEduYearACQuery, useGetStudentACQuery } from 'src/app/api/autocompleteSlice';
import EnhancedTable from 'src/components/data/CustomMUITable';
import CustomTableFilter from 'src/components/data/CustomTableFilter';
import ListPageHeader from 'src/components/details/ListPageHeader';
import { useGetFormsQuery } from 'src/store/services/internForm/internFormApiSlice';

function InternFormList() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({});
  const { data, currentData, isLoading, isSuccess, isError, error, refetch, isFetching } = useGetFormsQuery(filter);

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
      id: 'student',
      numeric: false,
      disablePadding: true,
      label: 'Öğrenci',
      style: 'text-left',
      notSortable: true,
      cellComponent: (value) => <p className="">{value.name + ' ' + value.last_name}</p>,
    },
    {
      id: 'follow_up',
      numeric: false,
      disablePadding: true,
      label: 'Yetkili',
      style: 'text-left',
      notSortable: true,
      cellComponent: (value) => <p className="">{value.name + ' ' + value.last_name}</p>,
    },
    {
      id: 'start_date',
      numeric: false,
      disablePadding: true,
      label: 'Staj Başlangıç Tarihi',
      style: 'text-left',
      cellComponent: (value) => <p className="">{moment(value).format('DD.MM.YYYY')}</p>,
    },
    {
      id: 'end_date',
      numeric: false,
      disablePadding: true,
      label: 'Staj Bitiş Tarihi',
      style: 'text-left',
      cellComponent: (value) => <p className="">{moment(value).format('DD.MM.YYYY')}</p>,
    },
    {
      id: 'edu_year',
      numeric: false,
      disablePadding: true,
      label: 'Staj Dönemi',
      style: 'text-left',
      notSortable: true,
      cellComponent: (value) => <p className="">{value?.name || ''}</p>,
    },
    {
      id: 'total_work_day',
      numeric: false,
      disablePadding: true,
      label: 'Toplam Staj Süresi',
      style: 'text-left',
      cellComponent: (value) => <p className="">{value + ' ' + 'Gün'}</p>,
    },
  ];

  const internFormFilters = [
    { id: 'student', type: 'autocomplete', componentProps: { useACSlice: useGetStudentACQuery, label: 'Öğrenci' } },
    { id: 'eduYear', type: 'autocomplete', componentProps: { useACSlice: useGetEduYearACQuery, label: 'Staj Dönemi' } },

    { id: 'startDate_gte', type: 'date', componentProps: { label: 'Başlangıç Tarihi (En Erken)' } },
    { id: 'startDate_lte', type: 'date', componentProps: { label: 'Başlangıç Tarihi (En Geç)' } },

    { id: 'endDate_gte', type: 'date', componentProps: { label: 'Bitiş Tarihi (En Erken)' } },
    { id: 'endDate_lte', type: 'date', componentProps: { label: 'Bitiş Tarihi (En Geç)' } },

    { id: 'name', type: 'text', componentProps: { label: 'Öğrenci ismi' } },
    { id: 'schoolNumber', type: 'text', componentProps: { label: 'Okul Numarası' } },
    { id: 'isSealed', type: 'boolean', componentProps: { label: 'Mühürlü Kayıtlar' } },
  ];

  return (
    <Box>
      <ListPageHeader header={'Staj Formu Listesi'} location={location.pathname} />
      <Paper>
        <CustomTableFilter
          filterOptions={internFormFilters}
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

export default InternFormList;
