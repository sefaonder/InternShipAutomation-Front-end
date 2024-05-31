import { Box, Paper, Tooltip, Typography } from '@mui/material';
import React from 'react';
import AddButton from '../inputs/AddButton';
import { useNavigate } from 'react-router-dom';

function ListPageHeader({ header, location, endComponent, tooltipTitle }) {
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

        <Box className="flex flex-row gap-4">
          {endComponent && endComponent}
          {location && (
            <Tooltip title={tooltipTitle}>
              <Box>
                <AddButton onClick={() => navigate(location + '/add')} />
              </Box>
            </Tooltip>
          )}
        </Box>
      </Box>
    </Paper>
  );
}

export default ListPageHeader;
