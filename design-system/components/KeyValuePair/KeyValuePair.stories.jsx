import React from 'react';
import KeyValuePair from './KeyValuePair';

export default {
  title: 'Components/KeyValuePair',
  component: KeyValuePair,
};

export const Default = {
  args: {
    items: [
      { key: 'Name', value: 'Acme Corp' },
      { key: 'Status', value: 'Active' },
      { key: 'Created', value: '2024-01-15' },
    ],
  },
};

export const WithKeyWidth = {
  args: {
    keyWidth: '120px',
    items: [
      { key: 'Label', value: 'Value content here' },
      { key: 'Another', value: 'Another value' },
    ],
  },
};
