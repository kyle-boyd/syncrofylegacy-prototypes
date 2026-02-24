import React, { useState } from 'react';
import BaseTextInput from './BaseTextInput';

export default {
  title: 'Components/BaseTextInput',
  component: BaseTextInput,
};

export const Default = () => {
  const [value, setValue] = useState('');
  return (
    <BaseTextInput
      name="demo"
      label="Label"
      value={value}
      onChange={setValue}
      placeholder="Placeholder"
    />
  );
};

export const WithError = () => {
  const [value, setValue] = useState('');
  return (
    <BaseTextInput
      name="err"
      label="Field"
      value={value}
      onChange={setValue}
      errors={{ required: true }}
    />
  );
};

export const Number = () => {
  const [value, setValue] = useState('');
  return (
    <BaseTextInput
      name="num"
      label="Amount"
      type="number"
      value={value}
      onChange={setValue}
    />
  );
};
