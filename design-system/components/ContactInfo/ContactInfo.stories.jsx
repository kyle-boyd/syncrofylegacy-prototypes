import React from 'react';
import ContactInfo from './ContactInfo';

export default {
  title: 'Components/ContactInfo',
  component: ContactInfo,
};

export const Default = {
  args: {
    title: 'Contact',
    fields: [
      { label: 'Email', value: 'user@example.com' },
      { label: 'Phone', value: '+1 234 567 8900' },
      { label: 'Address', value: '123 Main St' },
    ],
  },
};
