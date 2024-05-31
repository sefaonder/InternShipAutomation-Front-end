import { Box, Container, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import DiagramBox from './DiagramBox';
import PopUp from 'src/pages/Dashboard/PopUp';
import { InternStatusEnum } from 'src/app/enums/internStatus';

const Diagram = ({ data }) => {
  const diagramData = [
    {
      id: 'FRM01',
      index: 1,
      text: InternStatusEnum.FRM01.label,
      description: 'staj formunu o asdsa dasdasdsa dsadas dasdasd',
    },
    {
      id: 'FRM02',
      index: 2,
      text: InternStatusEnum.FRM02.label,
      description: 'staj formunu o asdsa dasdasdsa dsadas dasdasd',
    },
    {
      id: 'FRM03',
      index: 3,
      text: InternStatusEnum.FRM03.label,
      description: 'staj formunu o asdsa dasdasdsa dsadas dasdasd',
    },

    {
      id: 'RED01',
      hidden: true,
      index: 1,
      text: InternStatusEnum.RED01.label,
      description: 'staj formunu o asdsa dasdasdsa dsadas dasdasd',
    },

    {
      id: 'MLK01',
      index: 4,
      text: InternStatusEnum.MLK01.label,
      description: 'staj formunu o asdsa dasdasdsa dsadas dasdasd',
    },
    {
      id: 'MLK02',
      index: 5,
      text: InternStatusEnum.MLK02.label,
      description: 'staj formunu o asdsa dasdasdsa dsadas dasdasd',
    },
    {
      id: 'MLK03',
      index: 6,
      text: InternStatusEnum.MLK03.label,
      description: 'staj formunu o asdsa dasdasdsa dsadas dasdasd',
    },
    {
      id: 'MLK04',
      index: 1,
      hidden: true,
      text: InternStatusEnum.MLK04.label,
      description: 'staj formunu o asdsa dasdasdsa dsadas dasdasd',
    },

    {
      id: 'RED02',
      hidden: true,
      index: 1,
      text: InternStatusEnum.RED02.label,
      description: 'staj formunu o asdsa dasdasdsa dsadas dasdasd',
    },
    {
      id: 'RED03',
      hidden: true,
      index: 1,
      text: InternStatusEnum.RED03.label,
      description: 'staj formunu o asdsa dasdasdsa dsadas dasdasd',
    },

    {
      id: 'STJ00',
      index: 7,
      text: InternStatusEnum.STJ00.label,
      description: 'staj formunu o asdsa dasdasdsa dsadas dasdasd',
    },
  ];
  const [description, setDescription] = useState('');
  const [open, setOpen] = useState(false);

  const handleClickOpen = (item) => {
    setDescription(item);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const status = diagramData.findIndex((item) => item.id === data.status);

  return (
    <Box className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] justify-items-center gap-2">
      {diagramData.map((item, index) => {
        return (
          !item.hidden && (
            <DiagramBox
              key={item.index}
              handleClickOpen={handleClickOpen}
              index={item.index}
              item={item}
              success={status > index ? true : false}
              progress={status === index}
            />
          )
        );
      })}
      <PopUp item={description} open={open} handleClose={handleClose} />
    </Box>
  );
};

export default Diagram;
