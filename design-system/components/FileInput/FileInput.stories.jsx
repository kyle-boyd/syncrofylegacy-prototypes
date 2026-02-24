import React from 'react';
import FileInput from './FileInput';

export default {
  title: 'Components/FileInput',
  component: FileInput,
};

export const Default = {
  args: {
    name: 'doc',
    label: 'Upload file',
    accept: '.pdf,.doc',
    multiple: false,
    required: false,
  },
};

export const WithError = {
  args: {
    name: 'doc',
    label: 'Upload file',
    errors: { type: 'required' },
  },
};
