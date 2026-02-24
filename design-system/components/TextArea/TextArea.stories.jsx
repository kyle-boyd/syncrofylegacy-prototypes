import React from 'react';
import TextArea from './TextArea';

export default {
  title: 'Components/TextArea',
  component: TextArea,
};

export const Default = {
  args: {
    name: 'notes',
    label: 'Notes',
    value: '',
    placeholder: 'Enter text...',
    rows: 4,
  },
};

export const WithValue = {
  args: {
    name: 'notes',
    label: 'Notes',
    value: 'Some content here.',
    rows: 4,
  },
};
