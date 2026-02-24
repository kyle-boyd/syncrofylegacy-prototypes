import React from 'react';
import Breadcrumb from './Breadcrumb';

export default {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
};

export const Default = {
  args: {
    items: [
      { label: 'Home', href: '#' },
      { label: 'Settings', href: '#' },
      { label: 'Profile' },
    ],
  },
};
