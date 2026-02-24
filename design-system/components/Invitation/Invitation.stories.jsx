import React from 'react';
import Invitation from './Invitation';

export default {
  title: 'Components/Invitation',
  component: Invitation,
};

export const Default = {
  args: {
    title: "You're invited",
    message: 'Accept the invitation to join the workspace.',
    onAccept: () => {},
    onDecline: () => {},
  },
};
