import React, { useState } from 'react';
import PasswordInput from './PasswordInput';

export default {
  title: 'Components/PasswordInput',
  component: PasswordInput,
};

export const Default = () => {
  const [value, setValue] = useState('');
  return (
    <PasswordInput
      name="pwd"
      label="Password"
      value={value}
      onChange={setValue}
      placeholder="••••••••"
    />
  );
};
