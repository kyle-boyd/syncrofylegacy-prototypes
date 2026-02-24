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
  padding: ${({ theme }) => theme.constants.spacing2x} 0;
`;

const Placeholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: ${({ theme }) => theme.constants.spacing6x};
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  color: ${({ theme }) => theme.palette.greyedOutText};
  border: 1px dashed ${({ theme }) => theme.palette.stroke};
  border-radius: ${({ theme }) => theme.constants.radiusSmall};
`;

export default function LineWidget({ title = 'Trend', data = [], children }) {
  return (
    <Wrapper>
      {title && <Title>{title}</Title>}
      <ChartArea>
        {children ?? (
          <Placeholder>
            {data.length > 0 ? `Line chart (${data.length} points)` : 'Line chart'}
          </Placeholder>
        )}
      </ChartArea>
    </Wrapper>
  );
}
