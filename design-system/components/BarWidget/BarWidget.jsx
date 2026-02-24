import React from 'react';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  padding: ${({ theme }) => theme.constants.cardPadding};
  background-color: ${({ theme }) => theme.palette.white};
  border: 1px solid ${({ theme }) => theme.palette.stroke};
  border-radius: ${({ theme }) => theme.constants.radiusMedium};
  box-shadow: ${({ theme }) => theme.constants.z1};
`;

const Title = styled.h3`
  margin: 0 0 ${({ theme }) => theme.constants.spacing2x};
  font-size: ${({ theme }) => theme.constants.largeFontSize};
  font-weight: ${({ theme }) => theme.constants.semiBoldFontWeight};
  line-height: ${({ theme }) => theme.constants.largeLineHeight};
  color: ${({ theme }) => theme.palette.black};
`;

const ChartArea = styled.div`
  min-height: ${({ theme }) => theme.constants.spacing6x};
  display: flex;
  align-items: flex-end;
  gap: ${({ theme }) => theme.constants.spacing1x};
  padding: ${({ theme }) => theme.constants.spacing2x} 0;
`;

const Bar = styled.div`
  flex: 1;
  min-width: 0;
  background-color: ${({ theme }) => theme.palette.graphCerulean};
  border-radius: ${({ theme }) => theme.constants.radiusSmall} ${({ theme }) => theme.constants.radiusSmall} 0 0;
  min-height: ${({ theme }) => theme.constants.spacing1x};
  transition: opacity 0.2s;
  &:hover {
    opacity: 0.85;
  }
`;

export default function BarWidget({ title = 'Chart', data = [], maxValue }) {
  const max = maxValue ?? Math.max(...data.map((d) => (typeof d === 'number' ? d : d.value)), 1);
  return (
    <Wrapper>
      {title && <Title>{title}</Title>}
      <ChartArea>
        {data.map((d, i) => {
          const value = typeof d === 'number' ? d : d.value;
          const height = max > 0 ? (value / max) * 100 : 0;
          return <Bar key={i} style={{ height: `${height}%` }} title={String(value)} />;
        })}
      </ChartArea>
    </Wrapper>
  );
}
