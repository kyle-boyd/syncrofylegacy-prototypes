import React from 'react';
import FileExceptions from './FileExceptions';

export default {
  title: 'Components/FileExceptions',
  component: FileExceptions,
};

export const Default = {
  args: {
    exceptions: [
      { id: '1', title: 'Missing field', message: 'Required field was not provided.', status: 'pending' },
      { id: '2', title: 'Resolved', message: 'Fixed.', status: 'resolved' },
    ],
  },
};
