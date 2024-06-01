import { Box, Typography } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';
import NavigateLink from '../details/NavigateLink';

function DiagramHeader({ data }) {
  return (
    <Box>
      x"
      <Typography variant="h4">Güncel Staj Durumu</Typography>
      <NavigateLink text={'İlgili Staj Durumu'} linkId={data?.id} route={'intern-status'} />
      <Box className="my-4">
        <Typography variant="h5">Geçerli Staj Dönemi</Typography>
        <Typography variant="p">{data?.form?.edu_year?.name || ''}</Typography>
        <Typography variant="h5">Staj Tarihi</Typography>
        <Typography variant="p">{`${data?.form && dayjs(data.form.start_date).format('DD.MM.YYYY')} - ${data?.form && dayjs(data.form.end_date).format('DD.MM.YYYY')}`}</Typography>
        <Typography variant="h5">Firma Adı</Typography>
        <Typography variant="p">{data?.form?.company_info?.name || ''}</Typography>
      </Box>
    </Box>
  );
}

export default DiagramHeader;
