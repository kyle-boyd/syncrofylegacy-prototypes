import React from 'react';
import styled from '@emotion/styled';

const StyledCard = styled.div`
  background-color: ${({ theme }) => theme.palette.white};
  box-shadow: ${({ theme }) => theme.constants.z1};
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  min-width: 0;
  height: ${({ height }) => height || '100%'};
`;

export default function Card({ children, id, height }) {
  return (
    <StyledCard id={id || 'card'} data-component="card" height={height}>
      {children}
    </StyledCard>
  );
}
