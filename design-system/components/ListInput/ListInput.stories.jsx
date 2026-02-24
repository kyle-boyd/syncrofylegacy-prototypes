import React from 'react';
import ListInput from './ListInput';

export default {
  title: 'Components/ListInput',
  component: ListInput,
};

export const Default = {
  args: {
    name: 'tags',
    label: 'Tags',
    value: [],
    placeholder: 'Add tag...',
  },
};

export const WithItems = {
  args: {
    name: 'tags',
    label: 'Tags',
    value: ['Alpha', 'Beta', 'Gamma'],
    placeholder: 'Add tag...',
  },
};
