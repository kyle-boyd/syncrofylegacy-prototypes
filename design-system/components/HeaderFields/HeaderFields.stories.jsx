import React from 'react';
import HeaderFields from './HeaderFields';

export default {
  title: 'Components/HeaderFields',
  component: HeaderFields,
};

export const Default = {
  args: {
    title: 'Document',
    fields: [
      { label: 'ID', value: 'DOC-001' },
      { label: 'Status', value: 'Active' },
    ],
  },
};
