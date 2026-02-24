import React from 'react';
import ExceptionDetail from './ExceptionDetail';

export default {
  title: 'Components/ExceptionDetail',
  component: ExceptionDetail,
};

export const Pending = {
  args: {
    title: 'Document missing',
    message: 'Required field was not provided.',
    status: 'pending',
    fields: [{ label: 'Field', value: 'Document ID' }],
  },
};

export const Resolved = {
  args: {
    title: 'Resolved',
    message: 'Issue was fixed.',
    status: 'resolved',
  },
};
