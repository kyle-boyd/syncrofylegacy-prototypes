import React from 'react';
import BarWidget from './BarWidget';

export default {
  title: 'Components/BarWidget',
  component: BarWidget,
};

export const Default = {
  args: {
    title: 'Sales',
    data: [40, 65, 50, 80, 55],
  },
};
