import { Typography } from '@mui/material';
import React from 'react';
import ErrorIcon from '@mui/icons-material/Error';
function MailSend() {
  return (
    <div className="flex items-center bg-white rounded-xl justify-center border-2 m-2 relative login-container h-[20rem] lg:p-8">
      <img
        className="w-20 left-2/4 -translate-x-2/4 absolute top-[-40px]"
        src="https://uludag.edu.tr/img/uu.svg"
        alt=""
      />
      <Typography className="text-2xl border-b-2 flex items-center gap-2">
        Şifre Yenileme Linki Gönderildi <ErrorIcon className="text-orange-400" />
      </Typography>
    </div>
  );
}

export default MailSend;
