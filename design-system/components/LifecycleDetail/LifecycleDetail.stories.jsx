import React from 'react';
import LifecycleDetail from './LifecycleDetail';

export default {
  title: 'Components/LifecycleDetail',
  component: LifecycleDetail,
};

export const Default = {
  args: {
    title: 'Order lifecycle',
    headerFields: [
      { label: 'Order ID', value: 'ORD-001' },
      { label: 'Status', value: 'In progress' },
    ],
    timelineSteps: [
      { title: 'Submitted', status: 'complete', date: '2024-01-15' },
      { title: 'Review', status: 'pending' },
      { title: 'Approved', status: 'none' },
    ],
  },
};
