import { Box, Typography } from '@mui/material';
import React from 'react';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
const DiagramBox = ({ success, index, text }) => {
  return (
    <Box
      className={`w-[200px] flex-col justify-center items-center relative h-[120px] p-2 m-1 rounded-md flex  ${success ? 'bg-green-700 text-white' : 'bg-gray-300'}`}
    >
      <Typography className="text-right w-[20px] h-[20px] absolute top-2 right-2 bg-white flex items-center justify-center rounded-full">
        <span className="text-black">{index}</span>
      </Typography>
      <Box className="w-full  py-2 text-xs flex items-center justify-between ">
        <Typography className="text-xs"> {text}</Typography>
        <KeyboardDoubleArrowRightIcon></KeyboardDoubleArrowRightIcon>
      </Box>
    </Box>
  );
};

export default DiagramBox;
