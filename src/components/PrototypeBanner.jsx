import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@design-system';
import styled from '@emotion/styled';

const Banner = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.constants.spacing2x};
  padding: ${({ theme }) => `${theme.constants.spacing1x} ${theme.constants.spacing3x}`};
  background-color: #fff4cc;
  border-bottom: 1px solid #ffda6a;
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  color: ${({ theme }) => theme.palette.black};
  flex-shrink: 0;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.constants.spacing1x};
  color: ${({ theme }) => theme.palette.cerulean};
  text-decoration: none;
  font-weight: ${({ theme }) => theme.constants.semiBoldFontWeight};
  &:hover {
    color: ${({ theme }) => theme.palette.ceruleanHover};
  }
`;

const Label = styled.span`
  flex: 1;
  font-weight: ${({ theme }) => theme.constants.semiBoldFontWeight};
`;

/**
 * Banner shown at the top of every prototype page.
 * Displays "{prototypeName} version {version}" and a back link to the prototypes list.
 * Include this at the top of every prototype view.
 */
export default function PrototypeBanner({ prototypeName, version }) {
  const displayVersion = version ?? (typeof __APP_VERSION__ !== 'undefined' ? __APP_VERSION__ : '0.0.0');

  return (
    <Banner role="banner">
      <BackLink to="/">
        <Icon iconName="ARROW_LEFT" size={14} />
        Back to prototypes
      </BackLink>
      <Label>
        {prototypeName} version {displayVersion}
      </Label>
    </Banner>
  );
}
