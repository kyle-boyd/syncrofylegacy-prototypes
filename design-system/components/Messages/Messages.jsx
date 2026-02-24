import React from 'react';
import styled from '@emotion/styled';

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: ${({ theme }) => theme.constants.xsFontSize};
  color: ${({ theme }) => theme.palette.red};
`;

export function Message({ messages, when, children }) {
  return messages && messages[when] ? <li>{children}</li> : null;
}

export default function Messages({ for: forProp, children }) {
  if (!forProp) return null;
  const mapped = React.Children.map(children, (child) =>
    child ? React.cloneElement(child, { messages: forProp }) : null
  );
  return <List>{mapped}</List>;
}
