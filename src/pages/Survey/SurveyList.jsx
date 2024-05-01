import { Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetComissionACQuery, useGetEduYearACQuery, useGetStudentACQuery } from 'src/app/api/autocompleteSlice';
import { InternStatusEnum } from 'src/app/enums/internStatus';
import EnhancedTable from 'src/components/data/CustomMUITable';
import CustomTableFilter from 'src/components/data/CustomTableFilter';
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
      id: 'company_name',
      numeric: false,
      disablePadding: true,
      label: 'company_name',
      style: 'text-left',
      cellComponent: (value) => <p className="">{value}</p>,
    },
    {
      id: 'company_address',
      numeric: false,
      disablePadding: true,
      label: 'company_address',
      style: 'text-left',
      cellComponent: (value) => <p className="">{value}</p>,
    },
    {
      id: 'teach_type',
      numeric: false,
      disablePadding: true,
      label: 'teach_type',
      style: 'text-left',
      cellComponent: (value) => <p className="">{value}</p>,
    },
    {
      id: 'gano',
      numeric: false,
      disablePadding: true,
      label: 'gano',
      style: 'text-left',
      cellComponent: (value) => <p className="">{value}</p>,
    },
    {
      id: 'intern_group',
      numeric: false,
      disablePadding: true,
      label: 'intern_group',
      style: 'text-left',
      cellComponent: (value) => <p className=""> {value} </p>,
    },
    {
      id: 'intern_type',
      numeric: false,
      disablePadding: true,
      label: 'intern_type',
      style: 'text-left',
      cellComponent: (value) => <p className="">{value}</p>,
    },
    {
      id: 'date',
      numeric: false,
      disablePadding: true,
      label: 'date',
      style: 'text-left',
      cellComponent: (value) => <p className="">blablabla</p>,
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
    { id: 'companyName', type: 'text', componentProps: { label: 'Firma adı' } },
    { id: 'date', type: 'date', componentProps: { label: 'Anket Doldurma Tarihi' } },
    { id: 'status', type: 'enum', componentProps: { enumObject: InternStatusEnum, label: 'Staj durumu' } },
    { id: 'isSealed', type: 'boolean', componentProps: { label: 'Mühürsüz Kayıtlar' } },
  ];

  return (
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
        isLoading={isFetching || isLoading}
        isSuccess={isSuccess}
        filter={filter}
        setFilter={(values) => setFilter({ ...filter, ...values })}
      />

      <AddButton onClick={() => navigate(location.pathname + '/add')} />
    </Paper>
  );
};

export default SurveyList;
