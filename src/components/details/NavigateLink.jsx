import React from 'react';
import CallMadeSharpIcon from '@mui/icons-material/CallMadeSharp';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';

function NavigateLink({ linkId, route, text }) {
  return (
    <Box className="my-2 gap-2 flex">
      {linkId && (
        <Link to={`/${route}/${linkId}`}>
          <span className="underline">{text}</span> <CallMadeSharpIcon className="text-sm text-black" />
        </Link>
      )}
    </Box>
  );
}

export default NavigateLink;
