import React from 'react';
import styled from '@emotion/styled';
import VerticalTimeline from '../VerticalTimeline';

const Wrapper = styled.div`
  padding: ${({ theme }) => theme.constants.spacing2x} 0;
`;

const Title = styled.h3`
  margin: 0 0 ${({ theme }) => theme.constants.spacing2x};
  font-size: ${({ theme }) => theme.constants.largeFontSize};
  font-weight: ${({ theme }) => theme.constants.semiBoldFontWeight};
  line-height: ${({ theme }) => theme.constants.largeLineHeight};
  color: ${({ theme }) => theme.palette.black};
`;

export default function OrderHistoryTimeline({ title = 'Order history', items = [] }) {
  return (
    <Wrapper>
      {title && <Title>{title}</Title>}
      <VerticalTimeline items={items} />
    </Wrapper>
  );
}
