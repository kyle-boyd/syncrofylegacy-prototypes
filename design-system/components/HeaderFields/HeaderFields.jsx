import React from 'react';
import styled from '@emotion/styled';
import KeyValuePair from '../KeyValuePair';

const Wrapper = styled.div`
  padding: ${({ theme }) => theme.constants.spacing2x} 0;
  border-bottom: 1px solid ${({ theme }) => theme.palette.stroke};
`;

const Title = styled.h2`
  margin: 0 0 ${({ theme }) => theme.constants.spacing1x};
  font-size: ${({ theme }) => theme.constants.largeFontSize};
  font-weight: ${({ theme }) => theme.constants.semiBoldFontWeight};
  line-height: ${({ theme }) => theme.constants.largeLineHeight};
  color: ${({ theme }) => theme.palette.black};
`;

export default function HeaderFields({ title, fields = [] }) {
  const items = fields.map((f) => ({ key: f.label ?? f.key, value: f.value ?? '' }));
  return (
    <Wrapper>
      {title && <Title>{title}</Title>}
      <KeyValuePair items={items} />
    </Wrapper>
  );
}
