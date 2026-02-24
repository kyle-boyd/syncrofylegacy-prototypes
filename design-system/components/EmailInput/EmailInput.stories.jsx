import React, { useState } from 'react';
import EmailInput from './EmailInput';

export default {
  title: 'Components/EmailInput',
  component: EmailInput,
};

export const Default = () => {
  const [value, setValue] = useState('');
  return (
    <EmailInput
      name="email1"
      label="Email"
      value={value}
      onChange={setValue}
      placeholder="you@example.com"
    />
  );
};
