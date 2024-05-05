import { Box, Container, Typography } from '@mui/material';
import React from 'react';

const CustomDetailPageBox = ({ data }) => {
  return (
    <Container>
      {data.map((item) => (
        <Box className="flex flex-col  justify-between border-2 my-2 border-gray-200 p-2 rounded-lg ">
          {item.map((text) => (
            <Box className="flex flex-col justify-between w-full">
              <Typography className="font-semibold"> {text.text} </Typography>
              <Typography>{text.value}</Typography>
            </Box>
          ))}
        </Box>
      ))}
    </Container>
  );
};

export default CustomDetailPageBox;
