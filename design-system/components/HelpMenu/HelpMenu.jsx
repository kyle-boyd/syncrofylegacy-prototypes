import React from 'react';
import styled from '@emotion/styled';
import Icon from '../Icon';
import Popover from '../Popover';

const Trigger = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ theme }) => theme.constants.spacing4x};
  height: ${({ theme }) => theme.constants.spacing4x};
  padding: 0;
  border: none;
  border-radius: ${({ theme }) => theme.constants.radiusMedium};
  background-color: transparent;
  color: ${({ theme }) => theme.palette.greyedOutText};
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.palette.lightGreyHover};
    color: ${({ theme }) => theme.palette.darkGrey};
  }
`;

const MenuList = styled.ul`
  margin: 0;
  padding: ${({ theme }) => theme.constants.spacing1x};
  list-style: none;
  min-width: ${({ theme }) => theme.constants.spacing8x};
`;

const MenuItem = styled.li`
  padding: ${({ theme }) => `${theme.constants.spacing1x} ${theme.constants.spacing2x}`};
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  line-height: ${({ theme }) => theme.constants.normalLineHeight};
  color: ${({ theme }) => theme.palette.black};
  cursor: pointer;
  border-radius: ${({ theme }) => theme.constants.radiusSmall};
  &:hover {
    background-color: ${({ theme }) => theme.palette.whiteHover};
  }
`;

const MenuLink = styled.a`
  display: block;
  color: inherit;
  text-decoration: none;
  &:hover {
    color: inherit;
  }
`;

export default function HelpMenu({ items = [], triggerLabel = 'Help' }) {
  const content = (
    <MenuList>
      {items.map((item, i) => (
        <MenuItem key={item.key ?? i}>
          {item.href ? (
            <MenuLink href={item.href} target={item.external ? '_blank' : undefined} rel={item.external ? 'noopener noreferrer' : undefined}>
              {item.label}
            </MenuLink>
          ) : (
            <span onClick={item.onClick} onKeyDown={(e) => e.key === 'Enter' && item.onClick?.()} role="button" tabIndex={0}>
              {item.label}
            </span>
          )}
        </MenuItem>
      ))}
    </MenuList>
  );

  return (
    <Popover content={content} trigger="click">
      <Trigger type="button" aria-label={triggerLabel}>
        <Icon iconName="HELP" size={18} />
      </Trigger>
    </Popover>
  );
}
