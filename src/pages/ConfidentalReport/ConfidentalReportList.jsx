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
      id: 'company_name',
      numeric: false,
      disablePadding: true,
      label: 'company_name',
      style: 'text-left',
      cellComponent: (value) => <p className="">{value}</p>,
    },
    {
      id: 'address',
      numeric: false,
      disablePadding: true,
      label: 'address',
      style: 'text-left',
      cellComponent: (value) => <p className="">{value}</p>,
    },
    {
      id: 'start_date',
      numeric: false,
      disablePadding: true,
      label: 'start_date',
      style: 'text-left',
      cellComponent: (value) => <p className="">{value}</p>,
    },
    {
      id: 'end_date',
      numeric: false,
      disablePadding: true,
      label: 'end_date',
      style: 'text-left',
      cellComponent: (value) => <p className="">{value}</p>,
    },
    {
      id: 'days_of_absence',
      numeric: false,
      disablePadding: true,
      label: 'days_of_absence',
      style: 'text-left',
      cellComponent: (value) => <p className=""> {value} </p>,
    },
    {
      id: 'department',
      numeric: false,
      disablePadding: true,
      label: 'department',
      style: 'text-left',
      cellComponent: (value) => <p className="">{value}</p>,
    },
    {
      id: 'is_edu_program',
      numeric: false,
      disablePadding: true,
      label: 'is_edu_program',
      style: 'text-left',
      cellComponent: (value) => <p className="">{value}</p>,
    },
    {
      id: 'auth_name',
      numeric: false,
      disablePadding: true,
      label: 'auth_name',
      style: 'text-left',
      cellComponent: (value) => <p className="">{value}</p>,
    },
    {
      id: 'auth_position',
      numeric: false,
      disablePadding: true,
      label: 'auth_position',
      style: 'text-left',
      cellComponent: (value) => <p className=""> {value} </p>,
    },
    {
      id: 'reg_number',
      numeric: false,
      disablePadding: true,
      label: 'reg_number',
      style: 'text-left',
      cellComponent: (value) => <p className="">{value}</p>,
    },
    {
      id: 'auth_tc_number',
      numeric: false,
      disablePadding: true,
      label: 'auth_tc_number',
      style: 'text-left',
      cellComponent: (value) => <p className="">{value}</p>,
    },
    {
      id: 'auth_title',
      numeric: false,
      disablePadding: true,
      label: 'auth_title',
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
    { id: 'startDate', type: 'date', componentProps: { label: 'Başlangıç Tarihi' } },
    { id: 'endDate', type: 'date', componentProps: { label: 'Bitiş Tarihi' } },
    { id: 'status', type: 'enum', componentProps: { enumObject: InternStatusEnum, label: 'Staj durumu' } },
    { id: 'isMailSended', type: 'boolean', componentProps: { label: 'Mail Gönderilenler' } },
    { id: 'isSealed', type: 'boolean', componentProps: { label: 'Mühürsüz Kayıtlar' } },
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
