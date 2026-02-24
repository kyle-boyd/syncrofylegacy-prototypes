import React from 'react';
import styled from '@emotion/styled';

const ItemButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: ${({ theme }) => `${theme.constants.spacing2x} ${theme.constants.spacing3x}`};
  gap: ${({ theme }) => theme.constants.spacingQuarter};
  text-align: left;
  font-family: inherit;
  cursor: pointer;
  border: none;
  border-radius: ${({ theme }) => theme.constants.radiusSmall};
  background-color: ${({ theme, active }) =>
    active ? theme.palette.whiteSelected : 'transparent'};
  color: inherit;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: ${({ theme, active }) =>
      active ? theme.palette.whiteSelected : theme.palette.l1};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.palette.cerulean};
    outline-offset: 2px;
  }

  &:active {
    background-color: ${({ theme }) => theme.palette.whiteHover};
  }
`;

const PrimaryText = styled.span`
  font-size: ${({ theme }) => theme.constants.normalFontSize};
  font-weight: ${({ theme }) => theme.constants.normalFontWeight};
  line-height: ${({ theme }) => theme.constants.normalLineHeight};
  color: ${({ theme, active }) =>
    active ? theme.palette.cerulean : theme.palette.d1};
`;

const SecondaryText = styled.span`
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  font-weight: ${({ theme }) => theme.constants.normalFontWeight};
  line-height: ${({ theme }) => theme.constants.normalLineHeight};
  color: ${({ theme }) => theme.palette.greyedOutText};
`;

/**
 * A single selectable list item with primary and secondary (meta) text and active state.
 * Use inside SelectableList or standalone with consistent styling.
 * DS: ListItemWithMeta
 */
export default function SelectableListItem({
  primaryText,
  secondaryText,
  active = false,
  onClick,
  id,
  'aria-current': ariaCurrent,
  ...rest
}) {
  return (
    <ItemButton
      type="button"
      role="option"
      aria-selected={active}
      aria-current={ariaCurrent ?? (active ? 'true' : undefined)}
      active={active}
      onClick={onClick}
      id={id}
      {...rest}
    >
      {primaryText != null && <PrimaryText active={active}>{primaryText}</PrimaryText>}
      {secondaryText != null && secondaryText !== '' && (
        <SecondaryText>{secondaryText}</SecondaryText>
      )}
    </ItemButton>
  );
}
