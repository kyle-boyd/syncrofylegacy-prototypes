import React from 'react';
import MultiSelectBar from './MultiSelectBar';

export default {
  title: 'Components/MultiSelectBar',
  component: MultiSelectBar,
};

export const Empty = {
  args: {
    selected: [],
    label: 'Selected',
  },
};

export const WithItems = {
  args: {
    selected: [
      { id: '1', label: 'Alpha' },
      { id: '2', label: 'Beta' },
      { id: '3', label: 'Gamma' },
    ],
    label: 'Selected',
    onRemove: () => {},
  },
};
