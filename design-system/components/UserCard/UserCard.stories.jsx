import React from 'react';
import UserCard from './UserCard';

export default {
  title: 'Components/UserCard',
  component: UserCard,
};

export const Default = {
  args: {
    name: 'Jane Doe',
    email: 'jane@example.com',
  },
};

export const WithActions = {
  args: {
    name: 'John Smith',
    email: 'john@example.com',
    actions: <button type="button">Edit</button>,
  },
};
