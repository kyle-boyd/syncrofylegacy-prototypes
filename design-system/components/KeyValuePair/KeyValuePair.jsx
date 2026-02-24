import React from 'react';
import styled from '@emotion/styled';

const Container = styled.dl`
  margin: 0;
  padding: ${({ theme }) => `${theme.constants.spacing1x} 0`};
  display: grid;
  grid-template-columns: ${({ keyWidth }) => (keyWidth ? `${keyWidth} 1fr` : 'auto 1fr')};
  gap: ${({ theme }) => theme.constants.spacing1x} ${({ theme }) => theme.constants.spacing3x};
  align-items: baseline;
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  line-height: ${({ theme }) => theme.constants.normalLineHeight};
`;

const Key = styled.dt`
  margin: 0;
  color: ${({ theme }) => theme.palette.greyedOutText};
  font-weight: ${({ theme }) => theme.constants.normalFontWeight};
`;

const Value = styled.dd`
  margin: 0;
  color: ${({ theme }) => theme.palette.black};
  font-weight: ${({ theme }) => theme.constants.normalFontWeight};
`;

export default function KeyValuePair({ items = [], keyWidth }) {
  return (
    <Container keyWidth={keyWidth}>
      {items.map(({ key: k, value }) => (
        <React.Fragment key={k}>
          <Key>{k}</Key>
          <Value>{value}</Value>
        </React.Fragment>
      ))}
    </Container>
  );
}
