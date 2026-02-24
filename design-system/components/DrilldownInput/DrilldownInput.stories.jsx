import React from 'react';
import DrilldownInput from './DrilldownInput';

export default {
  title: 'Components/DrilldownInput',
  component: DrilldownInput,
};

export const Default = {
  args: {
    name: 'region',
    label: 'Region',
    options: [
      { value: 'us', label: 'US' },
      { value: 'eu', label: 'EU' },
    ],
    placeholder: 'Select region',
  },
};
