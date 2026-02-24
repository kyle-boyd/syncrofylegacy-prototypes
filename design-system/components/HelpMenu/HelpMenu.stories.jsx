import React from 'react';
import HelpMenu from './HelpMenu';

export default {
  title: 'Components/HelpMenu',
  component: HelpMenu,
};

export const Default = {
  args: {
    items: [
      { label: 'Documentation', href: '#' },
      { label: 'Contact support', href: '#', external: true },
    ],
  },
};
