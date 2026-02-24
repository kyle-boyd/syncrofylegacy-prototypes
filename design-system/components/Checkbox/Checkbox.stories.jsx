import React, { useState } from 'react';
import Checkbox from './Checkbox';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
};

export const PureCheckbox = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Checkbox
      checked={checked}
      onChange={setChecked}
      label="Accept terms"
    />
  );
};

export const WithRequired = () => (
  <Checkbox name="req" label="Required field" required />
);

export const Disabled = () => (
  <>
    <Checkbox checked={false} disabled label="Unchecked disabled" />
    <br />
    <Checkbox checked disabled label="Checked disabled" />
  </>
);
