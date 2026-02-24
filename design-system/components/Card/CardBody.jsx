import React from 'react';
import styled from '@emotion/styled';

const Body = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
  min-width: 0;
  height: 100%;
  padding: ${({ noPadding, noTopPadding, theme: { constants } }) => {
    if (noTopPadding) return `0 ${constants.spacing2x} ${constants.spacing2x} ${constants.spacing2x}`;
    return noPadding ? 0 : constants.spacing2x;
  }};
`;

export default function CardBody({ children, noPadding = false, noTopPadding = false }) {
  return (
    <Body id="card_body" noPadding={noPadding} noTopPadding={noTopPadding} data-component="card-body">
      {children}
    </Body>
  );
}
