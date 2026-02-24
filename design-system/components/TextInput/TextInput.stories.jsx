import React, { useState } from 'react';
import TextInput from './TextInput';

export default {
  title: 'Components/TextInput',
  component: TextInput,
};

export const Default = () => {
  const [value, setValue] = useState('');
  return (
    <TextInput
      name="text1"
      label="Name"
      value={value}
      onChange={setValue}
      placeholder="Enter name"
    />
  );
};
