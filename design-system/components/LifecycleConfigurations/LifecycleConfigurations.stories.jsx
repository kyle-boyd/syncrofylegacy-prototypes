import React from 'react';
import LifecycleConfigurations from './LifecycleConfigurations';

export default {
  title: 'Components/LifecycleConfigurations',
  component: LifecycleConfigurations,
};

export const Default = {
  args: {
    title: 'Lifecycle configurations',
    configurations: [
      { id: '1', name: 'Default', description: 'Standard lifecycle.' },
      { id: '2', name: 'Extended', description: 'Extended review steps.' },
    ],
  },
};
