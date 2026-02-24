import React from 'react';
import Pager from './Pager';

export default {
  title: 'Components/Pager',
  component: Pager,
};

export const Default = {
  args: {
    page: 1,
    pageSize: 10,
    totalCount: 95,
    onPageChange: () => {},
  },
};

export const LastPage = {
  args: {
    page: 10,
    pageSize: 10,
    totalCount: 95,
    onPageChange: () => {},
  },
};
