import React from 'react';
import styled from '@emotion/styled';
import Button from '../Button';
import Icon from '../Icon/Icon';

const Header = styled.div`
  display: flex;
  border-bottom: ${({ theme, hasDivider }) => (hasDivider ? `1px solid ${theme.palette.l2}` : '0')};
  justify-content: space-between;
  align-items: center;
  min-width: 0;
`;

const HeaderLeft = styled.div`
  display: flex;
  padding: ${({ theme }) => theme.constants.spacing2x};
  min-width: 0;
  overflow: hidden;
`;

const Title = styled.span`
  color: ${({ theme }) => theme.palette.d1};
  font-weight: ${({ theme }) => theme.constants.boldFontWeight};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const HeaderRight = styled.div`
  padding-right: ${({ theme }) => theme.constants.spacing2x};
  display: flex;
  justify-content: flex-end;
`;

const TitleIcon = styled.span`
  color: ${({ theme, color }) => color || theme.palette.d1};
  display: flex;
  align-items: center;
  padding-right: ${({ theme }) => theme.constants.spacing1x};
`;

const actionTypes = ['button', 'icon', 'none', 'custom'];

export default function CardHeader({
  children,
  title,
  titleIcon,
  hasDivider = false,
  actionType = 'none',
  actionIcon = 'NEW_TAB',
  onActionClick,
  actionDisabled = false,
  buttonText,
  buttonColor = 'blue',
  actions,
}) {
  if (children) {
    return <Header hasDivider={false} data-component="card-header">{children}</Header>;
  }

  return (
    <Header id="card_header" hasDivider={hasDivider} data-component="card-header">
      <HeaderLeft id="card_header_left">
        {titleIcon && (
          <TitleIcon id="card_header_title_icon">
            <Icon iconName={titleIcon} size={16} />
          </TitleIcon>
        )}
        <Title id="card_header_title">{title}</Title>
      </HeaderLeft>
      <HeaderRight id="card_header_right">
        {actionType === 'icon' && (
          <Button
            iconOnly={actionIcon}
            kind="transparent"
            size="medium"
            onClick={onActionClick}
            color={buttonColor}
            disabled={actionDisabled}
          />
        )}
        {actionType === 'button' && (
          <Button
            id="card_header_action_button"
            text={buttonText}
            color={buttonColor}
            onClick={onActionClick}
            disabled={actionDisabled}
          />
        )}
        {actionType === 'custom' && actions}
      </HeaderRight>
    </Header>
  );
}
