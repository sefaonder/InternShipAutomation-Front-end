import { Box, Paper, Typography } from '@mui/material';
import React from 'react';
import AddButton from '../inputs/AddButton';
import { useNavigate } from 'react-router-dom';

function ListPageHeader({ header, location, endComponent }) {
  const navigate = useNavigate();
  return (
    <Paper sx={{ my: '1rem' }}>
      <Box
        sx={{
          display: 'flex',
          padding: '1rem',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h3">{header}</Typography>

        {location && <AddButton onClick={() => navigate(location + '/add')} />}
        {endComponent && endComponent}
      </Box>
    </Paper>
  );
}

export default ListPageHeader;
