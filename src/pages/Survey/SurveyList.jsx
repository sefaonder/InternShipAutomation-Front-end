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
import AddButton from 'src/components/inputs/AddButton';
import { useGetSurveysQuery } from 'src/store/services/survey/surveyApiSlice';
import { resetSurvey } from 'src/store/services/survey/surveySlice';

const SurveyList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({});
  const { data, isLoading, isSuccess, isError, error, refetch, currentData, isFetching } = useGetSurveysQuery(filter);

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
    dispatch(resetSurvey());
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
        <p className="">{value?.student ? value.student?.name + ' ' + value.student?.last_name : ''}</p>
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
        <p className="">{value?.comission ? value.comission?.name + ' ' + value.comission?.last_name : ''}</p>
      ),
    },
    {
      id: 'date',
      numeric: false,
      disablePadding: true,
      label: 'Anketi Doldurma Zamanı',
      style: 'text-left',
      cellComponent: (value) => <p className="">{moment(value).format('DD.MM.YYYY')}</p>,
    },
    {
      id: 'gano',
      numeric: false,
      disablePadding: true,
      label: 'Gano',
      style: 'text-left',
      cellComponent: (value) => <p className=""> {value} </p>,
    },
    {
      id: 'intern_type',
      numeric: false,
      disablePadding: true,
      label: 'Staj Türü',
      style: 'text-left',
      cellComponent: (value) => <p className="">{value}</p>,
    },
    {
      id: 'isSealed',
      numeric: false,
      disablePadding: true,
      label: 'Kayıt Mühür Durumu',
      style: 'text-left',
      cellComponent: (value) => <p className="">{value ? 'Mühürlü' : 'Mühürlü Değil'}</p>,
    },
  ];

  const surveyFilters = [
    { id: 'student', type: 'autocomplete', componentProps: { useACSlice: useGetStudentACQuery, label: 'Öğrenci' } },
    { id: 'eduYear', type: 'autocomplete', componentProps: { useACSlice: useGetEduYearACQuery, label: 'Staj Dönemi' } },
    {
      id: 'comission',
      type: 'autocomplete',
      componentProps: { useACSlice: useGetComissionACQuery, label: 'Mülakat yapan' },
    },
    { id: 'date_gte', type: 'date', componentProps: { label: 'Anket Doldurma Tarihi (En Erken)' } },
    { id: 'date_lte', type: 'date', componentProps: { label: 'Anket Doldurma Tarihi (En Geç)' } },
    { id: 'status', type: 'enum', componentProps: { enumObject: InternStatusEnum, label: 'Staj durumu' } },
    { id: 'isSealed', type: 'boolean', componentProps: { label: 'Mühürlü Kayıtlar' } },
  ];

  return (
    <Box>
      <ListPageHeader header={'Öğrenci Değerlendirme Anketi Listesi'} location={location.pathname} />
      <Paper>
        <CustomTableFilter
          filterOptions={surveyFilters}
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

export default SurveyList;
