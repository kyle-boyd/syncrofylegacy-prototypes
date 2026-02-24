import React from 'react';
import BaseTextInput from '../BaseTextInput';
import { Message } from '../Messages';

const emailMessage = <Message when="email">Email is not a valid format!</Message>;

export default function EmailInput(props) {
  return (
    <BaseTextInput
      {...props}
      type="email"
      additionalMessages={emailMessage}
    />
  );
}
