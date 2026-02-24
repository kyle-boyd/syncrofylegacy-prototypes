import React from 'react';
import Partners from './Partners';

export default {
  title: 'Components/Partners',
  component: Partners,
};

export const Default = {
  args: {
    title: 'Partners',
    columns: [
      { key: 'name', title: 'Name' },
      { key: 'status', title: 'Status' },
    ],
    data: [
      { id: '1', name: 'Partner A', status: 'Active' },
      { id: '2', name: 'Partner B', status: 'Pending' },
    ],
  },
};
