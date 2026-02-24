import React from 'react';
import styled from '@emotion/styled';
import KeyValuePair from '../KeyValuePair';

const Card = styled.div`
  padding: ${({ theme }) => theme.constants.cardPadding};
  background-color: ${({ theme }) => theme.palette.white};
  border-radius: ${({ theme }) => theme.constants.radiusMedium};
  box-shadow: ${({ theme }) => theme.constants.z1};
  border: 1px solid ${({ theme }) => theme.palette.stroke};
`;

const Title = styled.h3`
  margin: 0 0 ${({ theme }) => theme.constants.spacing2x};
  font-size: ${({ theme }) => theme.constants.largeFontSize};
  font-weight: ${({ theme }) => theme.constants.semiBoldFontWeight};
  line-height: ${({ theme }) => theme.constants.largeLineHeight};
  color: ${({ theme }) => theme.palette.black};
`;

export default function ContactInfo({ title = 'Contact', fields = [] }) {
  const items = fields.map((f) => ({
    key: f.label ?? f.key,
    value: f.value ?? '',
  }));
  return (
    <Card>
      <Title>{title}</Title>
      <KeyValuePair items={items} />
    </Card>
  );
}
