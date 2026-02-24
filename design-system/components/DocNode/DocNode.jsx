import React from 'react';
import styled from '@emotion/styled';

const Node = styled.div`
  padding: ${({ theme }) => theme.constants.spacing2x};
  background-color: ${({ theme }) => theme.palette.white};
  border: 1px solid ${({ theme }) => theme.palette.stroke};
  border-radius: ${({ theme }) => theme.constants.radiusMedium};
  box-shadow: ${({ theme }) => theme.constants.z1};
`;

const Title = styled.div`
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  font-weight: ${({ theme }) => theme.constants.semiBoldFontWeight};
  line-height: ${({ theme }) => theme.constants.normalLineHeight};
  color: ${({ theme }) => theme.palette.black};
  margin-bottom: ${({ theme }) => theme.constants.spacing1x};
`;

const Meta = styled.div`
  font-size: ${({ theme }) => theme.constants.xsFontSize};
  color: ${({ theme }) => theme.palette.greyedOutText};
  line-height: ${({ theme }) => theme.constants.normalLineHeight};
`;

export default function DocNode({ title, subtitle, children }) {
  return (
    <Node>
      {title && <Title>{title}</Title>}
      {subtitle && <Meta>{subtitle}</Meta>}
      {children}
    </Node>
  );
}
