import React from 'react';
import styled from '@emotion/styled';
import { statusColors, statuses } from './constants';

const Line = styled.div`
  width: ${({ theme, size }) => (size === 24 ? `calc(5 * ${theme.constants.spacing2x} + 1px)` : `calc(12.5 * ${theme.constants.spacing2x})`)};
  background-color: ${({ status }) => statusColors[status] || statusColors[statuses.none]};
  height: ${({ theme }) => theme.constants.spacingQuarter};
  margin: ${({ theme, size }) => (size === 24
    ? `${theme.constants.spacing1_5x} ${theme.constants.spacing1x} 0 ${theme.constants.spacing1x}`
    : `${theme.constants.spacing2x} ${theme.constants.spacing1x} 0 ${theme.constants.spacing1x}`)};
`;

export default function LifecycleTimelineSeparator({ status = statuses.none, size = 32 }) {
  return <Line status={status} size={size} />;
}
