import React, { useState } from 'react';
import { Radio, RadioGroup } from './index';

export default {
  title: 'Components/RadioInput',
  component: RadioGroup,
};

export const Default = () => {
  const [value, setValue] = useState('a');
  return (
    <RadioGroup
      name="radios"
      label="Choose one"
      value={value}
      onChange={setValue}
      useStringValues
    >
      <Radio label="A Option" value="a" />
      <Radio label="B Option" value="b" />
      <Radio label="C Option" value="c" />
    </RadioGroup>
  );
};

export const Horizontal = () => {
  const [value, setValue] = useState('a');
  return (
    <RadioGroup
      name="radios-h"
      label="Horizontal"
      value={value}
      onChange={setValue}
      horizontal
    >
      <Radio label="A" value="a" />
      <Radio label="B" value="b" />
      <Radio label="C" value="c" />
    </RadioGroup>
  );
};
