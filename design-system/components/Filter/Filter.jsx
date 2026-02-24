import React from 'react';
import styled from '@emotion/styled';
import Button from '../Button';

const Bar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.constants.spacing1x};
  padding: ${({ theme }) => theme.constants.spacing2x};
  background-color: ${({ theme }) => theme.palette.cloud};
  border: 1px solid ${({ theme }) => theme.palette.stroke};
  border-radius: ${({ theme }) => theme.constants.radiusMedium};
`;

const Label = styled.span`
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  font-weight: ${({ theme }) => theme.constants.semiBoldFontWeight};
  color: ${({ theme }) => theme.palette.black};
`;

export default function Filter({
  label = 'Filter',
  children,
  onClear,
  showClear = true,
}) {
  return (
    <Bar>
      <Label>{label}</Label>
      {children}
      {showClear && onClear && (
        <Button text="Clear" kind="transparent" color="cerulean" size="small" onClick={onClear} />
      )}
    </Bar>
  );
}
