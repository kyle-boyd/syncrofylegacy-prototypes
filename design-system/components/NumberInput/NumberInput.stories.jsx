import React, { useState } from 'react';
import NumberInput from './NumberInput';

export default {
  title: 'Components/NumberInput',
  component: NumberInput,
};

export const Default = () => {
  const [value, setValue] = useState('');
  return (
    <NumberInput
      name="qty"
      label="Quantity"
      value={value}
      onChange={setValue}
      min={0}
      max={100}
    />
  );
};
