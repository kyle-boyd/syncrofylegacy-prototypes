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

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.constants.spacing2x};
  margin-bottom: ${({ theme }) => theme.constants.spacing1x};
`;

const Label = styled.span`
  flex: 0 0 ${({ theme }) => theme.constants.spacing6x};
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  color: ${({ theme }) => theme.palette.black};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Track = styled.div`
  flex: 1;
  height: ${({ theme }) => theme.constants.spacing2x};
  background-color: ${({ theme }) => theme.palette.l2};
  border-radius: ${({ theme }) => theme.constants.radiusPill};
  overflow: hidden;
`;

const Fill = styled.div`
  height: 100%;
  background-color: ${({ theme }) => theme.palette.graphCerulean};
  border-radius: ${({ theme }) => theme.constants.radiusPill};
  transition: width 0.2s;
`;

const Value = styled.span`
  flex: 0 0 ${({ theme }) => theme.constants.spacing3x};
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  color: ${({ theme }) => theme.palette.greyedOutText};
  text-align: right;
`;

export default function HorizontalBarWidget({ title = 'Chart', data = [], maxValue }) {
  const max = maxValue ?? Math.max(...data.map((d) => (typeof d === 'number' ? d : d.value)), 1);
  return (
    <Wrapper>
      {title && <Title>{title}</Title>}
      {data.map((d, i) => {
        const value = typeof d === 'number' ? d : d.value;
        const label = typeof d === 'object' && d.label != null ? d.label : `Item ${i + 1}`;
        const pct = max > 0 ? (value / max) * 100 : 0;
        return (
          <Row key={i}>
            <Label>{label}</Label>
            <Track>
              <Fill style={{ width: `${pct}%` }} />
            </Track>
            <Value>{value}</Value>
          </Row>
        );
      })}
    </Wrapper>
  );
}
