import React from 'react';
import OrderHistoryTimeline from './OrderHistoryTimeline';

export default {
  title: 'Components/OrderHistoryTimeline',
  component: OrderHistoryTimeline,
};

export const Default = {
  args: {
    title: 'Order history',
    items: [
      { date: '2024-01-15', title: 'Created', content: 'Order submitted.' },
      { date: '2024-01-16', title: 'Updated', content: 'Status changed.' },
    ],
  },
};
