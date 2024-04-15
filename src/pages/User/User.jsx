import React from 'react';
import EnhancedTable from 'src/components/data/CustomMUITable';
import CustomMUITable from 'src/components/data/CustomMUITable';

const User = () => {
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
  ];

  const rows2 = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];

  const headers = [
    {
      id: 'name',
      numeric: false,
      disablePadding: true,
      label: 'Dessert (100g serving)',
      style: 'text-left',
    },
    {
      id: 'calories',
      numeric: true,
      disablePadding: false,
      label: 'Calories',
      style: 'text-center',
    },
    {
      id: 'fat',
      numeric: true,
      disablePadding: false,
      label: 'Fat (g)',
      style: 'text-right',
      cellComponent: (value) => <p className="text-red-700 bg-green-400">{value}</p>,
    },
    {
      id: 'carbs',
      numeric: true,
      disablePadding: false,
      label: 'Carbs (g)',
      style: 'text-right',
    },
  ];

  function createData(id, name, calories, fat, carbs, protein) {
    return {
      id,
      name,
      calories,
      fat,
      carbs,
      protein,
    };
  }

  const rows = [
    createData(1, 'Cupcake', 305, 3.7, 67, 4.3),
    createData(2, 'Donut', 452, 25.0, 51, 4.9),
    createData(3, 'Eclair', 262, 16.0, 24, 6.0),
    createData(4, 'Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData(5, 'Gingerbread', 356, 16.0, 49, 3.9),
    createData(6, 'Honeycomb', 408, 3.2, 87, 6.5),
    createData(7, 'Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData(8, 'Jelly Bean', 375, 0.0, 94, 0.0),
    createData(9, 'KitKat', 518, 26.0, 65, 7.0),
    createData(10, 'Lollipop', 392, 0.2, 98, 0.0),
    createData(11, 'Marshmallow', 318, 0, 81, 2.0),
    createData(12, 'Nougat', 360, 19.0, 9, 37.0),
    createData(13, 'Oreo', 437, 18.0, 63, 4.0),
  ];
  return (
    <div>
      <EnhancedTable columns={headers} data={rows} />
    </div>
  );
};

export default User;
