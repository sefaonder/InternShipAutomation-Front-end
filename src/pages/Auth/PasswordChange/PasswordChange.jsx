import React, { useState } from 'react';
import MailSend from './MailSend';
import EmailControl from './EmailControl';

function PasswordChange() {
  const [isMailSended, setIsMailSended] = useState(false);

  if (isMailSended) {
    return <MailSend />;
  }

  return <EmailControl setMailSended={(value) => setIsMailSended(value)} />;
}

export default PasswordChange;
