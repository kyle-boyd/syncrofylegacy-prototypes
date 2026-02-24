import React from 'react';
import HorizontalBarWidget from './HorizontalBarWidget';

export default {
  title: 'Components/HorizontalBarWidget',
  component: HorizontalBarWidget,
};

export const Default = {
  args: {
    title: 'By category',
    data: [
      { label: 'A', value: 40 },
      { label: 'B', value: 65 },
      { label: 'C', value: 50 },
    ],
  },
};
