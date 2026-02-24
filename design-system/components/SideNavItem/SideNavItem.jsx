import React from 'react';
import styled from '@emotion/styled';
import Icon from '../Icon/Icon';

const Row = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.constants.spacing2x} ${theme.constants.spacing3x}`};
  gap: ${({ theme }) => theme.constants.spacing2x};
  color: ${({ theme }) => theme.palette.white};
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  font-weight: ${({ theme }) => theme.constants.normalFontWeight};
  line-height: ${({ theme }) => theme.constants.normalLineHeight};
  cursor: pointer;
  background-color: ${({ theme, isActive }) => (isActive ? theme.palette.seaHover : 'transparent')};
  border-right: 3px solid ${({ theme, isActive }) => (isActive ? theme.palette.sky : 'transparent')};
  text-decoration: none;
  border: none;
  width: 100%;
  text-align: left;
  font-family: inherit;

  &:hover {
    background-color: ${({ theme, isActive }) => (!isActive ? theme.palette.seaHover : theme.palette.seaHover)};
    ${({ theme, isActive }) => (!isActive ? `border-right: 3px solid ${theme.palette.sky};` : '')}
  }

  .side-nav-item-icon {
    color: ${({ theme }) => theme.palette.white};
    opacity: 0.9;
    flex-shrink: 0;
  }
`;

const IndentedRow = styled(Row)`
  padding-left: 40px;
`;

const LabelWrap = styled.span`
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.constants.spacing1x};
`;

const NotificationBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: ${({ theme }) => theme.constants.spacing3x};
  height: ${({ theme }) => theme.constants.spacing3x};
  border-radius: ${({ theme }) => theme.constants.radiusPill};
  background-color: ${({ theme }) => theme.palette.red};
  color: ${({ theme }) => theme.palette.white};
  font-size: ${({ theme }) => theme.constants.xsFontSize};
  font-weight: ${({ theme }) => theme.constants.boldFontWeight};
  flex-shrink: 0;
`;

const ChevronWrap = styled.span`
  flex-shrink: 0;
  display: inline-flex;
  transform: ${({ isExpanded }) => (isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)')};
  transition: transform 0.2s ease;
`;

const Bullet = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.palette.white};
  opacity: 0.8;
  flex-shrink: 0;
`;

const SubList = styled.div`
  display: flex;
  flex-direction: column;
`;

function SideNavItem({
  iconName,
  label,
  isActive = false,
  hasNotification = false,
  isExpandable = false,
  isExpanded = false,
  subItems = [],
  onClick,
  href,
  indent = false,
  onKeyDown,
  id,
  ...rest
}) {
  const content = (
    <>
      {!indent && iconName && (
        <span className="side-nav-item-icon" aria-hidden>
          <Icon iconName={iconName} size={20} />
        </span>
      )}
      {indent && <Bullet aria-hidden />}
      <LabelWrap>
        <span>{label}</span>
        {hasNotification && (
          <NotificationBadge aria-label="Notification">!</NotificationBadge>
        )}
      </LabelWrap>
      {isExpandable && (
        <ChevronWrap isExpanded={isExpanded} aria-hidden>
          <Icon iconName="CHEVRON_DOWN" size={16} />
        </ChevronWrap>
      )}
    </>
  );

  const rowProps = {
    isActive,
    as: href ? 'a' : 'button',
    ...(href ? { href } : { type: 'button' }),
    onClick,
    onKeyDown,
    'aria-current': isActive ? 'page' : undefined,
    'aria-expanded': isExpandable ? isExpanded : undefined,
    id,
    ...rest,
  };

  const row = indent ? (
    <IndentedRow {...rowProps}>{content}</IndentedRow>
  ) : (
    <Row {...rowProps}>{content}</Row>
  );

  return (
    <div>
      {row}
      {isExpandable && isExpanded && subItems.length > 0 && (
        <SubList>
          {subItems.map((sub, i) => (
            <SideNavItem
              key={sub.id ?? i}
              label={sub.label}
              indent
              isActive={sub.isActive}
              href={sub.href}
              onClick={sub.onClick}
            />
          ))}
        </SubList>
      )}
    </div>
  );
}

export default SideNavItem;
