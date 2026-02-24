import React from 'react';
import NumberedPager from './NumberedPager';

export default {
  title: 'Components/NumberedPager',
  component: NumberedPager,
};

export const Default = {
  args: {
    page: 3,
    pageSize: 10,
    totalCount: 95,
    onPageChange: () => {},
  },
};
