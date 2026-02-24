import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  height: ${({ theme }) => `calc(2 * ${theme.constants.spacing6x} + ${theme.constants.spacing3x})`};
  display: flex;
  padding: ${({ theme }) => `0 0 0 ${theme.constants.spacing4x}`};
  margin: auto;
`;

export default function LifecycleContainer({ children }) {
  return <Container>{children}</Container>;
}
