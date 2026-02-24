import React from 'react';
import styled from '@emotion/styled';

const Label = styled.span`
  float: right;
  font-size: ${({ theme }) => theme.constants.xxsFontSize};
  line-height: ${({ theme }) => theme.constants.smallLineHeight};
  color: ${({ theme, error, disabled }) => {
    if (error) return theme.palette.red;
    if (disabled) return theme.palette.d3;
    return theme.palette.d2;
  }};
`;

export default function RequiredLabel({ id, error, disabled, children = 'Required' }) {
  return (
    <Label id={id} error={!!error} disabled={!!disabled}>
      {children}
    </Label>
  );
}
