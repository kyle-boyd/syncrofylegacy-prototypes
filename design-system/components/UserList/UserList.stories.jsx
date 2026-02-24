import React from 'react';
import UserList from './UserList';

export default {
  title: 'Components/UserList',
  component: UserList,
};

export const Default = {
  args: {
    users: [
      { id: '1', name: 'Jane Doe', email: 'jane@example.com' },
      { id: '2', name: 'John Smith', email: 'john@example.com' },
    ],
  },
};
