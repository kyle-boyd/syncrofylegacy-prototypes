import React from 'react';
import styled from '@emotion/styled';

const TabList = styled.div`
  display: flex;
  width: 100%;
  background-color: ${({ theme }) => theme.palette.white};
  border-bottom: ${({ theme }) =>
    `${theme.constants.tabSeparatorThickness} solid ${theme.palette.stroke}`};
`;

const TabLabel = styled.span`
  position: relative;
  display: inline-block;

  ${({ theme, active }) =>
    active &&
    `
    &::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: -${theme.constants.spacing2x};
      height: ${theme.constants.tabUnderlineThickness};
      background-color: ${theme.palette.cerulean};
      border-radius: ${theme.constants.tabUnderlineRadius} ${theme.constants.tabUnderlineRadius} 0 0;
    }
  `}
`;

const TabButton = styled.button`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.constants.spacing2x} ${({ theme }) => theme.constants.tabGap};
  font-family: inherit;
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  line-height: ${({ theme }) => theme.constants.normalLineHeight};
  font-weight: ${({ theme }) => theme.constants.boldFontWeight};
  color: ${({ theme, active }) =>
    active ? theme.palette.cerulean : theme.palette.greyedOutText};
  background: none;
  border: none;
  cursor: pointer;
  outline: none;

  &:hover {
    color: ${({ theme, active }) =>
      active ? theme.palette.cerulean : theme.palette.greyHover};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.palette.cerulean};
    outline-offset: 2px;
  }

  ${({ theme, active }) =>
    active &&
    `
    margin-bottom: -${theme.constants.tabSeparatorThickness};
  `}
`;

export default function Tabs({ tabs = [], activeTabId, onTabChange }) {
  const selectedId =
    activeTabId ?? (tabs.length > 0 ? tabs[0].id : null);

  return (
    <TabList role="tablist">
      {tabs.map(({ id, label }) => (
        <TabButton
          key={id}
          type="button"
          role="tab"
          aria-selected={selectedId === id}
          active={selectedId === id}
          onClick={() => onTabChange?.(id)}
        >
          <TabLabel active={selectedId === id}>{label}</TabLabel>
        </TabButton>
      ))}
    </TabList>
  );
}
