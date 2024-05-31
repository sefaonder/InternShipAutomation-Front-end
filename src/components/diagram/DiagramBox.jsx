import { Box, Typography } from '@mui/material';
import React from 'react';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
const DiagramBox = ({ success, index, item, handleClickOpen, progress }) => {
  return (
    <Box
      onClick={() => handleClickOpen(item)}
      sx={{
        backgroundColor: success ? 'success.light' : progress ? 'warning.light' : 'background.paper',
      }}
      className={`w-[200px] shadow-2xl flex-col justify-center items-center relative h-[120px] p-2 m-1 rounded-md flex hover:opacity-40  transition ease-in-out delay-100 hover:cursor-pointer`}
    >
      <Typography className="text-right w-[20px] h-[20px] absolute top-2 right-2 bg-white flex items-center justify-center rounded-full">
        <span className="text-black">{index}</span>
      </Typography>
      <Box className="w-full  py-2 text-xs flex items-center justify-between ">
        <Typography> {item.text}</Typography>
        <KeyboardDoubleArrowRightIcon></KeyboardDoubleArrowRightIcon>
      </Box>
    </Box>
  );
};

export default DiagramBox;
