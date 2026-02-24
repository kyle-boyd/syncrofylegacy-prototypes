import React from 'react';
import styled from '@emotion/styled';

const Nav = styled.nav`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.constants.spacingHalf};
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  line-height: ${({ theme }) => theme.constants.normalLineHeight};
`;

const List = styled.ol`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const Item = styled.li`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.constants.spacingHalf};
  &:not(:last-child)::after {
    content: '/';
    color: ${({ theme }) => theme.palette.greyedOutText};
    margin-left: ${({ theme }) => theme.constants.spacingHalf};
  }
`;

const Link = styled.a`
  color: ${({ theme }) => theme.palette.cerulean};
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.palette.ceruleanHover};
    text-decoration: underline;
  }
`;

const Current = styled.span`
  color: ${({ theme }) => theme.palette.greyedOutText};
  font-weight: ${({ theme }) => theme.constants.normalFontWeight};
`;

export default function Breadcrumb({ items = [] }) {
  return (
    <Nav aria-label="Breadcrumb">
      <List>
        {items.map((item, i) => (
          <Item key={item.key ?? i}>
            {item.href != null && i < items.length - 1 ? (
              <Link href={item.href} onClick={(e) => item.onClick && (e.preventDefault(), item.onClick())}>
                {item.label}
              </Link>
            ) : (
              <Current>{item.label}</Current>
            )}
          </Item>
        ))}
      </List>
    </Nav>
  );
}
