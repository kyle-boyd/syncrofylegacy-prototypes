import React from 'react';
import ToastContainer from './ToastContainer';

export default {
  title: 'Components/ToastContainer',
  component: ToastContainer,
};

export const Default = {
  args: {
    toasts: [
      { id: '1', message: 'Saved successfully.' },
      { id: '2', message: 'Item deleted.', variant: 'warning' },
      { id: '3', message: 'Something went wrong.', variant: 'error' },
    ],
  },
};
