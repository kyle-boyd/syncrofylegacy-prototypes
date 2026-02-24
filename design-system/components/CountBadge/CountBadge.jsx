import React from 'react';
import styled from '@emotion/styled';

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: ${({ theme }) => theme.constants.spacing3x};
  height: ${({ theme }) => theme.constants.spacing3x};
  padding: 0 ${({ theme }) => theme.constants.spacing1x};
  border-radius: ${({ theme }) => theme.constants.radiusPill};
  font-size: ${({ theme }) => theme.constants.xsFontSize};
  font-weight: ${({ theme }) => theme.constants.boldFontWeight};
  line-height: ${({ theme }) => theme.constants.normalLineHeight};
  background-color: ${({ theme, variant }) =>
    variant === 'error' ? theme.palette.red : variant === 'success' ? theme.palette.green : theme.palette.cerulean};
  color: ${({ theme }) => theme.palette.white};
`;

export default function CountBadge({ count = 0, variant = 'default' }) {
  return (
    <Badge variant={variant} aria-label={`Count: ${count}`}>
      {count > 99 ? '99+' : count}
    </Badge>
  );
}
