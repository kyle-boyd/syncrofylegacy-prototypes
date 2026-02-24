import React from 'react';
import Filter from './Filter';

export default {
  title: 'Components/Filter',
  component: Filter,
};

export const Default = {
  args: {
    label: 'Filter',
    onClear: () => {},
    children: <span>Filter controls go here</span>,
  },
};
