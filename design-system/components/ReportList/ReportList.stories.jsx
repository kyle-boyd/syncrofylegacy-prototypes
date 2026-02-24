import React from 'react';
import ReportList from './ReportList';
import Button from '../Button';

export default {
  title: 'Components/ReportList',
  component: ReportList,
};

export const Default = {
  args: {
    items: [
      { id: '1', title: 'Q1 Report' },
      { id: '2', title: 'Q2 Report' },
      { id: '3', title: 'Q3 Report' },
    ],
    renderActions: (item) => <Button text="View" kind="transparent" color="cerulean" size="small" />,
  },
};

export const Empty = {
  args: { items: [] },
};
